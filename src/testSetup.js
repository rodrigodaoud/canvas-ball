// add all jest-extended matchers
import * as matchers from 'jest-extended';
import '@testing-library/jest-dom';

expect.extend(matchers);
