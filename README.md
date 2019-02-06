## DevApp (starter-ionic-app)

Starter blueprint for Ionic apps, used by the Ionic 1.x.

This is the repo for Ionic 1.x. If you're looking for the latest version (>= 4.0) of Ionic, please visit the main [Ionic](https://github.com/ionic-team/ionic) repo.

For new apps, we _strongly_ recommend the [latest version of Ionic](https://github.com/ionic-team/ionic) which comes with the latest version of Angular, many new components, enhanced performance, and more.

### Installation & Development

1. clone this repo: `git clone https://github.com/douglaszaltron/starter-ionic-app.git`
2. `cd starter-ionic-app`
3. `yarn install`
4. run `yarn build && yarn start` from a terminal

### Installation in bash_profile

1. run `open ~/.bash_profile` from a terminal
2. copy line and save

``` bash
create-ionic-app() {
    curl -L https://github.com/douglaszaltron/starter-ionic-app/archive/master.tar.gz | tar -xz
    mkdir -p "${1}"
    mv starter-ionic-app-master/{*,.[^.]*} "${1}"
    rm -d starter-ionic-app-master
    cd "${1}" || exit
}
```
3. run `source ~/.bash_profile`
4. from create new project run `create-ionic-app samples`

### Updating components scss

`scss` will automatically update on every commit to the master branch of this repo.
