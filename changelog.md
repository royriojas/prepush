
# prepush - Changelog
## v3.0.1
- **Cosmetic fixes**
  - Fix typo in code - [ef6f6e5]( https://github.com/royriojas/prepush/commit/ef6f6e5 ), [royriojas](https://github.com/royriojas), 25/07/2015 04:13:06

    
## v3.0.0
- **Build Scripts Changes**
  - Add missing `bumpery` dev dependency - [ccafe93]( https://github.com/royriojas/prepush/commit/ccafe93 ), [royriojas](https://github.com/royriojas), 25/07/2015 03:47:49

    
  - Add `pre-push` keyword - [0aae223]( https://github.com/royriojas/prepush/commit/0aae223 ), [royriojas](https://github.com/royriojas), 25/07/2015 03:42:23

    
- **Features**
  - Add the option to enable/disable colored output - [926fe55]( https://github.com/royriojas/prepush/commit/926fe55 ), [royriojas](https://github.com/royriojas), 25/07/2015 03:47:20

    
- **Documentation**
  - Put back info about the custom `config.json` file - [77da2cd]( https://github.com/royriojas/prepush/commit/77da2cd ), [royriojas](https://github.com/royriojas), 25/07/2015 03:44:24

    
- **Refactoring**
  - Updated deps and improved code - [b9c2959]( https://github.com/royriojas/prepush/commit/b9c2959 ), [royriojas](https://github.com/royriojas), 25/07/2015 03:44:24

    
## v2.0.4
- **Build Scripts Changes**
  - Add install-hooks and bump tasks - [f388459]( https://github.com/royriojas/prepush/commit/f388459 ), [Roy Riojas](https://github.com/Roy Riojas), 02/04/2015 21:40:28

    
  - Updated deps for beautification and linting - [70c9d2d]( https://github.com/royriojas/prepush/commit/70c9d2d ), [Roy Riojas](https://github.com/Roy Riojas), 02/04/2015 21:33:27

    
- **Documentation**
  - Add changelog - [4477ead]( https://github.com/royriojas/prepush/commit/4477ead ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:23:45

    
#### hook
- **Bug Fixes**
  - Make the default option follow Unix conventions. Fixes [#1](https://github.com/royriojas/prepush/issues/1) - [8b31b82]( https://github.com/royriojas/prepush/commit/8b31b82 ), [Roy Riojas](https://github.com/Roy Riojas), 02/04/2015 21:15:06

    
  - Fix prepush logic to calculate the dirty state and properly create the stash. Fix [#2](https://github.com/royriojas/prepush/issues/2) - [dc7d6d6]( https://github.com/royriojas/prepush/commit/dc7d6d6 ), [gsound](https://github.com/gsound), 02/04/2015 20:37:00

    - Dirty state does not consider empty folders anymore
    - Male sure the temporary is properly deleted after stash
    -
## v2.0.3
- **Documentation**
  - Better error message when prepush property not found in config file. Related to [#1](https://github.com/royriojas/prepush/issues/1) - [fe20167]( https://github.com/royriojas/prepush/commit/fe20167 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:21:59

    
  - Added changelog - [ae1b3d2]( https://github.com/royriojas/prepush/commit/ae1b3d2 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:17:16

    
## v2.0.2
- **Documentation**
  - Fix broken link to image - [44c6ad0]( https://github.com/royriojas/prepush/commit/44c6ad0 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:15:42

    
#### prepush tasks
- **Bug Fixes**
  - Do not fail if the prepush tasks is not present. Fix [#1](https://github.com/royriojas/prepush/issues/1) - [e0bc489]( https://github.com/royriojas/prepush/commit/e0bc489 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:15:18

    Now a message explaining the error is presented to the user, letting him know how to fix the issue
    
## v2.0.1
#### prepush tasks
- **Bug Fixes**
  - Do not fail if the prepush tasks is not present - [495f5a8]( https://github.com/royriojas/prepush/commit/495f5a8 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:10:41

    Now a message explaining the error is presented to the user
    
## v2.0.0
#### hook improvements
- **Enhancements**
  - Add option to ask for confirmation before push - [21d3a8e]( https://github.com/royriojas/prepush/commit/21d3a8e ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 01:50:25

    
## v1.0.7
#### hook
- **Features**
  - The hook now will stash your changes previous to execute the prepush tasks - [ec943e6]( https://github.com/royriojas/prepush/commit/ec943e6 ), [Roy Riojas](https://github.com/Roy Riojas), 19/03/2015 04:13:53

    
## v1.0.6
- **Enhancements**
  - Improved log message - [30e4149]( https://github.com/royriojas/prepush/commit/30e4149 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 23:51:38

    
## v1.0.5
- **Build Scripts Changes**
  - Add changelogx dep - [2a5ddfe]( https://github.com/royriojas/prepush/commit/2a5ddfe ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 03:39:28

    
## v1.0.4
#### Promise issue
- **Bug Fixes**
  - Fix for an issue when trying to load the Promise module - [8f27be1]( https://github.com/royriojas/prepush/commit/8f27be1 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 03:36:06

    
- **Build Scripts Changes**
  - Add keywords - [c7184ca]( https://github.com/royriojas/prepush/commit/c7184ca ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 04:34:57

    
- **Enhancements**
  - Make the prepush to load the json configuration file instead of replacing it inline - [57c556e]( https://github.com/royriojas/prepush/commit/57c556e ), [Roy Riojas](https://github.com/Roy Riojas), 10/03/2015 02:38:44

    
- **Bug Fixes**
  - Fix wrong binary name - [38b60d5]( https://github.com/royriojas/prepush/commit/38b60d5 ), [Roy Riojas](https://github.com/Roy Riojas), 10/03/2015 02:20:11

    
- **Refactoring**
  - Revert back to use es6-promise globally - [d1fa334]( https://github.com/royriojas/prepush/commit/d1fa334 ), [Roy Riojas](https://github.com/Roy Riojas), 10/03/2015 01:23:20

    
  - properly copy the prepush hook to the destination - [d9c83dd]( https://github.com/royriojas/prepush/commit/d9c83dd ), [Roy Riojas](https://github.com/Roy Riojas), 09/03/2015 23:06:23

    
- **Features**
  - Remove peer deps as they are going to be deprecated - [f802710]( https://github.com/royriojas/prepush/commit/f802710 ), [Roy Riojas](https://github.com/Roy Riojas), 10/03/2015 00:56:34

    
  - Try to make the confirmation to work after a hook failure - [194e633]( https://github.com/royriojas/prepush/commit/194e633 ), [Roy Riojas](https://github.com/Roy Riojas), 10/03/2015 00:01:01

    
  - prepush install working - [d5a7307]( https://github.com/royriojas/prepush/commit/d5a7307 ), [Roy Riojas](https://github.com/Roy Riojas), 09/03/2015 22:54:22

    
- **Other changes**
  - Initial commit - [4ba7ffb]( https://github.com/royriojas/prepush/commit/4ba7ffb ), [Roy Riojas](https://github.com/Roy Riojas), 09/03/2015 20:29:38

    
