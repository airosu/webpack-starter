import { file1Hello } from './file1';
import { file2Hello } from './sub1/sub2/sub4/sub5/sub6/sub7/file2';
import { file3Hello } from './sub1/sub2/sub3/file3';

console.log( 'Hello from index.ts!' );
file1Hello();
file2Hello();
file3Hello();

