# Facebook Gender Survey Dashboard

Interactive exploration of global results from the Facebook "Survey on Gender Equality At Home".

Important links:

- Staging site: <https://develop--gender-survey-dashboard.netlify.app/>
- Production site: <https://gender-survey-dashboard.netlify.app/>
- Original data set: <https://data.humdata.org/dataset/survey-on-gender-equality-at-home>
- Survey results report <https://dataforgood.fb.com/docs/gendersurveyreport/>

## Requirements

- Vagrant 2.2+
- VirtualBox 6.0+

## Getting Started

Install the application and all required dependencies.

```sh
./scripts/setup
```

### Development

Rebuild Docker images and run application.

```sh
vagrant up
vagrant ssh
./scripts/update
./scripts/server
```

## Data

The data used by this application is generated from a source set provided by
Facebook's data team:

<https://data.humdata.org/dataset/survey-on-gender-equality-at-home>

To convert the source dataset into a format used by the application, run the
`dataproc` script on your VM. irst, you will need to download the two Excel
sheets from GDrive and place in `src/dataproc`. In the future, this script will
automatically download the required data from HDX.

```sh
vagrant up
vagrant ssh
./scripts/update
./scripts/dataproc
```

This will download the source data, process it, and convert it to several
JSON files. The resulting files can be found in `src/dataproc/output`. If the
upstream HDX data sources are updated, the URLs used in the processing script
will need to be updated to match.

### Data files

The dataproc tool will generate 4 files:

- `region_config.json`: Essentially the Codebook sheet of the region Excel file. This is a data dictionary that contains the list of geographies included, the full question and response text for a given variable, and the index position of the variable value in the data array. Since Country and Region files don't have 100% overlap of questions, this metadata is used to read the Region data file exclusively.
- `region_data.json`: A compact representation of the Data sheet in the region Excel file. The top level key is a year, containing a sub-dictionary with keys for each geography. Each geography in turn has keys for the gender categories: `male`, `female`, and `combined`. Each gender key then has an array corresponding to the variables described in the config metadata object. The `idx` key of the variable in the config represents the position of the variable data in the array.
- `country_config.json`: Equivalent to the region_config file, but generated from the country Excel sheet.
- `country_data.json`: Equivalent to the region_data file, but generated from the country Excel sheet.

An example data schema:

```json
{
  "2020": {
    "geographies": {
      "North America": {
        "male": [1, 2, 3],
        "female": [10, 20, 30],
        "combined": [11, 22, 33]
      }
    }
  }
}
```

### Updating application with new data

To update the data files for the application, the four generated files need
to be manually moved into the application directory. The `dataproc` script
does not automatically move new data files to decrease the risk that a
malformed data file will be deployed. Please thoroughly test any newly
generated data in the application before releasing it.

The two config files should be moved into `src/app/src/data` from where they are
directly built into the source code bundles of the app. This is because the
files are small, and are required for the initial rendering of the homepage.
By bundling them into the source code we ensure a fast initial render.

The two data files, however, are larger and could grow over time if more
questions are added to the survey. These two files need to be moved into the
`src/app/public/data/` directory, where they are made available to the
frontend app via a `fetch` request.

After moving the four files to their appropriate directory, commit and push
the changeset. The next release and deployment will include the new data and
metadata files.

### Incorporating future survey years

It is expected that in future years, new survey will be added to the
application without replacing the existing data. In that scenario, the data
processing script will need to be updated to generate new config and data
objects for that survey year. The application will then need to be modified
to allow fetching the correct data for the selected year.

## Ports

| Service            | Port                            |
| ------------------ | ------------------------------- |
| Webpack Dev Server | [`3333`](http://localhost:3333) |

## Testing

```console
./scripts/test
```

## Scripts

| Name       | Description                                           |
| ---------- | ----------------------------------------------------- |
| `cibuild`  | Build project for CI                                  |
| `clean`    | Free disk space by cleaning up dangling Docker images |
| `console`  | Run interactive shell inside application container    |
| `dataproc` | Generate new application data from source data        |
| `lint`     | Lint source code                                      |
| `server`   | Run Docker Compose services                           |
| `setup`    | Provision Vagrant VM and run `update`                 |
| `test`     | Run unit tests                                        |
| `update`   | Build Docker images                                   |

## Adding NPM Packages

To add a new NPM package to the project:

- Manually add the package to the project's `package.json` file, ensuring that you
  pin it to a specific version.
- Run `./scripts/update` in the VM.
- Commit the changes to the following files to git:
  - `package.json`
  - `yarn.lock`

### Notes

- We usually pin packages to a specific version to minimize build errors.
