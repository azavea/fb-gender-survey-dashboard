#!/usr/bin/python3
import pandas as pd
import numpy as np
import json

# These are direct URIs that link to a particular version of the dataset. If they are
# updated in the future, the links will likely need to be refreshed from the HDX website
# https://data.humdata.org/dataset/survey-on-gender-equality-at-home
country_xls_uri = "https://data.humdata.org/dataset/504fce69-12c2-4c56-ada2-3173c663107a/resource/f9bb675a-0c83-4513-b1cc-464c75048906/download/sog_agg_country.xlsx"
region_xls_uri = "https://data.humdata.org/dataset/504fce69-12c2-4c56-ada2-3173c663107a/resource/d9fbb283-9147-487d-8be3-746ebf4e3478/download/sog_agg_region.xlsx"

output_dir = "/opt/src/src/dataproc/output"

# Currently, these path are local to the dataproc contatiner but are intended
# to be replaced by the appropriate URI, as defined above.
region_xls_uri = "/opt/src/src/dataproc/sog_agg_region.xlsx"
country_xls_uri = "/opt/src/src/dataproc/sog_agg_country.xlsx"

class NpEncoder(json.JSONEncoder):
    """Numpy type encoder.

    Converts numpy types to equivalent Python types to support JSON serialization.
    """

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)


def generate():
    # Read in the region and country Excel file's codebook and sheets
    region_config = pd.read_excel(region_xls_uri, sheet_name="Codebook")
    region_data = pd.read_excel(region_xls_uri, sheet_name="Data")

    country_config = pd.read_excel(country_xls_uri, sheet_name="Codebook")
    country_data = pd.read_excel(country_xls_uri, sheet_name="Data")

    print("Generating country data...")
    generate_config(country_config, country_data, "subregion")
    generate_data(country_data, "subregion")

    print("Generating region data...")
    generate_config(region_config, region_data, "region")
    generate_data(region_data, "region")


def generate_data(data_df, mode: str):
    # Create a multi-index on Year, {Region|Country}, and Gender which we want as nested
    # dict keys in our final output. Effectively, this turns the rows into something
    # we can iterate through that looks like this:
    # - 2020
    #   - North America
    #      - Male
    #      - Female
    #      - Combined
    #   - South America
    #      - Male
    #      ...

    # Drop country-aggregate rows before setting up a multiIndex since the
    # query will be easier to write. These rows contain "Rest of" as the
    # country name
    rest_of_idx = data_df[data_df[mode.capitalize()].str.contains("Rest of")].index
    data_df = data_df.drop(rest_of_idx)

    # Set up multiIndex on the year -> geography mode -> gender. This makes a
    # nested structure that maps well to our final dict
    data_df = data_df.set_index(["Year", mode.capitalize(), "Gender"])

    if mode == "subregion":
        # Drop country specific columns that don't need to be included
        data_df = data_df.drop(columns=["Region", "Internet_Penetration"])

    # Loop through each index level, and create a nested dictionary
    output = {}
    for year in data_df.index.levels[0]:
        # Each year (there is only one)
        output[year] = {"geographies": {}}
        for geography in data_df.index.levels[1]:
            # Each geography under year
            output[year]["geographies"][geography] = {}
            for gender in data_df.index.levels[2]:
                # Each gender category per year-geography (Male, Female, Combined).
                # Create a list of just the values of the data cells. We're
                # specfically not including the keys, because there are 100s of them
                # and we're trying to keep the data payload small. The client will get
                # values by index.
                output[year]["geographies"][geography][gender] = data_df.xs(
                    [year, geography, gender]
                ).replace({np.nan: None}).tolist()

    name = mode
    if mode == "subregion":
        name = "country"

    with open(f"{output_dir}/{name}_data.json", "w") as f:
        f.write(json.dumps(output, cls=NpEncoder))


def generate_config(config_df, data_df, mode: str):

    # Shorten/rename some column names. Names are not always consitent between
    # country/region files.
    config_df.rename(
        columns={
            "Variable": "var",
            "Variable Name": "var",
            "Variable Label": "label",
            "Parameter or Survey Question": "label",
            "Response Category": "cat",
            "Response category": "cat",
            "Answer Label or Code": "cat",
        },
        inplace=True,
    )

    def partition_if_string(s):
        if type(s) is str:
            return s.partition(". ")
        else:
            return ("","","")

    # The question column values have a code prefix ("C.2.") and a text
    # sentence, split these out into two fields
    config_df["question"] = config_df["label"].apply(lambda s: partition_if_string(s)[2])
    config_df["qcode"] = config_df["label"].apply(lambda s: partition_if_string(s)[0])

    config_df["cat"] = config_df["cat"].apply(lambda x: x if "[Open-ended]" != x else None)
    config_df["cat"] = config_df["cat"].apply(lambda x: x if "[Average]" != x else None)

    # The visualization type can be detremined by the absence and presence
    # of values in the category or question columns. Define these heuristics.
    question_types = [
        (
            config_df["cat"].notna()
            & config_df["question"].str.contains("agree or disagree")
        ),
        (config_df["cat"].notna()),
        (~config_df["cat"].notna() & config_df["question"].str.contains("What is your gender")),
        (~config_df["cat"].notna() & config_df["question"].str.contains("Out of 10")),
        (
            ~config_df["cat"].notna()
            & config_df["question"].str.contains("how many hours per day")
        ),
        (~config_df["cat"].notna()),
    ]

    # The value to use for type, based on the heuristic index above
    values = ["stack", "pct", "pct", "ten", "hours", None]

    # Assign the type column
    config_df["type"] = np.select(question_types, values)

    # Trim string columns of extra whitespace
    config_df["cat"] = config_df["cat"].str.strip()
    config_df["cat"] = config_df["cat"].replace({np.nan: None})
    config_df["question"] = config_df["question"].str.strip()

    # Define columns that we don't want persisted per data source
    region_attrs_drop = ["Year", "Region", "Gender"]
    country_attrs_drop = region_attrs_drop + ["Internet_Penetration", "Subregion"]
    attrs_drop = region_attrs_drop if mode == "region" else country_attrs_drop

    # Set the variable name value as the row index, which will be the key
    # as we convert to json using the {var: { cat: a, question: b, type: c}} shape.
    # Drop the records for Year, Region, and Gender since those will become keys
    # on our data object.
    config_df = config_df[["var", "cat", "question", "qcode", "type"]]
    config_df = config_df.set_index("var")
    config_df = config_df.drop(index=attrs_drop)

    # Add an "idx" column which indicates the index at which this variable can
    # be retrieved from the corresponding data object. Note that this assumes the
    # variables in the data sheet (columns) are in the same order as the variables
    # listed in the codebook sheet (rows). This is true as of the 2020 data.
    config_df["idx"] = range(len(config_df))

    data_config = config_df.to_dict(orient="index")

    # The full list of geographies we care about (either region or country)
    # sorted and cleaned of any aggregate "countries", (e.g., "Rest of Latin America")
    geos = sorted(data_df[mode.capitalize()].unique().tolist())
    geos_clean = [geo for geo in geos if "Rest of" not in geo]

    # Complete config object
    config = {
        "geographies": geos_clean,
        "survey": data_config,
        "categories": {
            "Norms, Access, and Agency": "A",
            "Time Spent and Care": "B",
            "COVID's Impact": "C",
            "Demographics": "D",
        },
    }

    name = mode
    if mode == "subregion":
        name = "country"

    with open(f"{output_dir}/{name}_config.json", "w") as f:
        f.write(json.dumps(config, ensure_ascii=False))


if __name__ == "__main__":
    generate()
