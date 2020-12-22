# Facebook Gender Survey Dashboard

Interactive exploration of global results from the Facebook "Survey on Gender Equality At Home".

Original data set:
<https://data.humdata.org/dataset/survey-on-gender-equality-at-home>

Survey results report
<https://dataforgood.fb.com/docs/gendersurveyreport/>

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

### Data

The data used by this application is generated from a source set provided by
Facebook's data team:

<https://data.humdata.org/dataset/survey-on-gender-equality-at-home>

To convert the source dataset into a format used by the application, run the
`dataproc` script on your VM. First, you will need to download the two Excel
sheets from GDrive and place in `src/dataproc`. In the future, this script will
automatically download the required data from HDX.

```sh
vagrant up
vagrant ssh
./scripts/update
./scripts/dataproc
```

This will download the source data, process it, and convert it to JSON. The
resulting files can be found in `src/dataproc/output`. To update the
application, move these files into the `src/app/public/data/` directory. The next
release and deployment will include the updated data. The `dataproc` script
does not automatically move new data files to the `public/data` directory to
decrease the risk that a malformed data file will be deployed. Please
thoroughly test any newly generated data in the application before releasing
it.

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
