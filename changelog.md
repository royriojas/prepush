
# prepush - Changelog
## v2.0.3
- **Build Scripts Changes**
  - Release v2.0.3 - [28d98db]( https://github.com/royriojas/prepush/commit/28d98db ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:22:19
    
- **Documentation**
  - Better error message when prepush property not found in config file. Related to [#1](https://github.com/royriojas/prepush/issues/1) - [fe20167]( https://github.com/royriojas/prepush/commit/fe20167 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:21:59
    
  - Added changelog - [ae1b3d2]( https://github.com/royriojas/prepush/commit/ae1b3d2 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:17:16
    
## v2.0.2
- **Build Scripts Changes**
  - Release v2.0.2 - [528d79b]( https://github.com/royriojas/prepush/commit/528d79b ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:15:57
    
  - Release v2.0.1 - [aabeec9]( https://github.com/royriojas/prepush/commit/aabeec9 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:15:42
    
- **Documentation**
  - Fix broken link to image - [44c6ad0]( https://github.com/royriojas/prepush/commit/44c6ad0 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:15:42
    
#### prepush tasks
- **Bug Fixes**
  - Do not fail if the prepush tasks is not present. Fix [#1](https://github.com/royriojas/prepush/issues/1) - [e0bc489]( https://github.com/royriojas/prepush/commit/e0bc489 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:15:18
    Now a message explaining the error is presented to the user, letting him know how to fix the issue
   
## v2.0.1
- **Build Scripts Changes**
  - Release v2.0.1 - [11c500f]( https://github.com/royriojas/prepush/commit/11c500f ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:11:48
    
#### prepush tasks
- **Bug Fixes**
  - Do not fail if the prepush tasks is not present - [495f5a8]( https://github.com/royriojas/prepush/commit/495f5a8 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 18:10:41
    Now a message explaining the error is presented to the user
   
## v2.0.0
- **Build Scripts Changes**
  - Release v2.0.0 - [b871953]( https://github.com/royriojas/prepush/commit/b871953 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 01:50:50
    
#### hook improvements
- **Enhancements**
  - Add option to ask for confirmation before push - [21d3a8e]( https://github.com/royriojas/prepush/commit/21d3a8e ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 01:50:25
    
#### changelog
- **Build Scripts Changes**
  - generated changelog - [ebf88e9]( https://github.com/royriojas/prepush/commit/ebf88e9 ), [Roy Riojas](https://github.com/Roy Riojas), 19/03/2015 04:23:00
    
## v1.0.7
- **Build Scripts Changes**
  - Release v1.0.7 - [abd322a]( https://github.com/royriojas/prepush/commit/abd322a ), [Roy Riojas](https://github.com/Roy Riojas), 19/03/2015 04:19:46
    
#### hook
- **Features**
  - The hook now will stash your changes previous to execute the prepush tasks - [ec943e6]( https://github.com/royriojas/prepush/commit/ec943e6 ), [Roy Riojas](https://github.com/Roy Riojas), 19/03/2015 04:13:53
    
## v1.0.6
- **Build Scripts Changes**
  - Release v1.0.6 - [0442ff2]( https://github.com/royriojas/prepush/commit/0442ff2 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 23:51:48
    
- **Enhancements**
  - Improved log message - [30e4149]( https://github.com/royriojas/prepush/commit/30e4149 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 23:51:38
    
## v1.0.5
- **Build Scripts Changes**
  - Release v1.0.5 - [273c665]( https://github.com/royriojas/prepush/commit/273c665 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 03:39:35
    
  - Add changelogx dep - [2a5ddfe]( https://github.com/royriojas/prepush/commit/2a5ddfe ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 03:39:28
    
## v1.0.4
- **Build Scripts Changes**
  - Release v1.0.4 - [b002501]( https://github.com/royriojas/prepush/commit/b002501 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 03:36:58
    
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
    
#### Promise issue
- **Bug Fixes**
  - Fix for an issue when trying to load the Promise module - [8f27be1]( https://github.com/royriojas/prepush/commit/8f27be1 ), [Roy Riojas](https://github.com/Roy Riojas), 17/03/2015 03:36:06
    
