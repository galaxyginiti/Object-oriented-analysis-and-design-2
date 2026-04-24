# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION ${CMAKE_VERSION}) # this file comes with cmake

# If CMAKE_DISABLE_SOURCE_CHANGES is set to true and the source directory is an
# existing directory in our source tree, calling file(MAKE_DIRECTORY) on it
# would cause a fatal error, even though it would be a no-op.
if(NOT EXISTS "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-src")
  file(MAKE_DIRECTORY "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-src")
endif()
file(MAKE_DIRECTORY
  "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-build"
  "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix"
  "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix/tmp"
  "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix/src/json-populate-stamp"
  "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix/src"
  "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix/src/json-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix/src/json-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/Users/ruslan/dev/temp/Object-oriented-analysis-and-design-2/lab02/932304.anishko.ruslan.decorator-pattern/backend-no-pattern/build/_deps/json-subbuild/json-populate-prefix/src/json-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
