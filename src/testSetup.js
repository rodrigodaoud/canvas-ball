// add all jest-extended matchers
import * as matchers from 'jest-extended';
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
import '@testing-library/dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

expect.extend(matchers);
