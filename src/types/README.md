# types

This project size doesn't justify the _need_ to have the types experted out of their individual files into and index file to then have it all exported out again. However, in large projects where I file uses many types from different files, being able to import from `/types` instead of many different paths is cleaner.

```javascript
import { Film, Booking } from '/types';
```

versus

```javascript
import { Film } from '/types/Films';
import { Booking } from '/types/Bookings';
```
