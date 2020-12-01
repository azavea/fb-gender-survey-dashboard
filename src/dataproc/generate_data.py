#!/usr/bin/python3
import pandas as pd

country_xls_uri = "https://data.humdata.org/dataset/504fce69-12c2-4c56-ada2-3173c663107a/resource/8f5c866e-7447-43a5-b5fe-8614c14a1b4a/download/sog_agg_country.xlsx"
region_xls_uri = "https://data.humdata.org/dataset/504fce69-12c2-4c56-ada2-3173c663107a/resource/8951688f-6a2c-460c-b880-4eb81341a8d2/download/sog_agg_region.xlsx"


def generate():
    print("Generating country data...")
    generate_country_data()

    print("Generating region data...")
    generate_region_data()


def generate_country_data():
    country = pd.read_excel(country_xls_uri)
    country.to_json(path_or_buf="/opt/src/src/dataproc/output/country.json")


def generate_region_data():
    region = pd.read_excel(region_xls_uri)
    region.to_json(path_or_buf="/opt/src/src/dataproc/output/region.json")


if __name__ == "__main__":
    generate()