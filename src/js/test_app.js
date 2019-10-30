import { add1 } from './utils/test_intFunctions';
import { add2 } from './utils/test_intFunctions';

export function add3( input ) {
    let output = add1( input );
    output = add2 ( output );
    return output;
}

