## HEAD

## 2.1.0
###### _Jan 31, 2018_
- Lodash as a peerDependency was causing missing peerDependency errors.  Lodash peerDep replaced with stifle dep (#7) @shawnmcknight
- Bump several dependency versions @shawnmcknight
- Configure npm to not generate package-lock file @shawnmcknight

## 2.0.0

###### _May 30, 2017_
Major version bump to facilitate new dependency requirements:
- Make react a peerDependency to avoid running module duplication (#3) @shawnmcknight
- Make lodash a peerDependency due to its common use and avoid inflating build size unnecessarily @shawnmcknight

## 1.0.2

###### _May 28, 2017_
- Remove separate lodash modules in favor of direct import of functions @shawnmcknight
- Add support for prettier and update libraries to conform to rules @shawnmcknight
- Update all dependencies to latest version and make updates to conform to API changes @shawnmcknight
- Update all devDependencies to latest version and make updates to conform to API changes @shawnmcknight
- Eliminate usage of lodash isEqual in favor of separate instance variables @shawnmcknight
- Updated test suite to check for returned values rather than simply calling @shawnmcknight

## 1.0.1

###### _Apr 26, 2017_
- Cancel throttled events when unmounting component @shawnmcknight

## 1.0.0

###### _Apr 17, 2017_

- Add unit tests through mocha/chai/enzyme to reach 100% code coverage @shawnmcknight
- Add code coverage tooling through istanbul/nyc @shawnmcknight
- Update to React separate prop-types package @shawnmcknight
- Update all dependencies to latest versions @shawnmcknight
- Correct instruction link in README @shawnmcknight

## 0.1.0

###### _Mar 25, 2017_

- Initial creation of this repository!  Thanks for using it!
