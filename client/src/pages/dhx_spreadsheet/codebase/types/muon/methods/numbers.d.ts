import { cellValue, mathArgument } from "../types";
export declare function SUM(...rest: cellValue[]): number;
export declare function AVERAGE(...rest: mathArgument[]): number;
export declare function AVERAGEA(...rest: mathArgument[]): number;
export declare function COUNT(...rest: mathArgument[]): number;
export declare function COUNTA(...rest: cellValue[]): number;
export declare function COUNTBLANK(...rest: cellValue[]): number;
export declare function MAX(...rest: cellValue[]): number;
export declare function MIN(...rest: cellValue[]): number;
export declare function PRODUCT(...rest: cellValue[]): number;
export declare function SUMPRODUCT(...sets: cellValue[][]): number;
export declare function SUMSQ(...rest: cellValue[]): number;
export declare function VAR(...rest: mathArgument[]): number;
export declare function VARA(...rest: mathArgument[]): number;
export declare function VARP(...rest: mathArgument[]): number;
export declare function VARPA(...rest: mathArgument[]): number;
export declare function STDEV(...rest: mathArgument[]): number;
export declare function STDEVP(...rest: mathArgument[]): number;
export declare function STDEVA(...rest: mathArgument[]): number;
export declare function STDEVPA(...rest: mathArgument[]): number;
export declare function POWER(num: cellValue, pow: cellValue): number;
export declare function QUOTIENT(num: cellValue, div: cellValue): number;
export declare function SQRT(num: cellValue): number;
export declare function ABS(num: cellValue): number;
export declare function RAND(): number;
export declare function PI(): number;
export declare function INT(num: cellValue): number;
export declare function ROUND(num: cellValue, digits?: cellValue): number;
export declare function ROUNDDOWN(num: cellValue, digits: cellValue): number;
export declare function ROUNDUP(num: cellValue, digits?: cellValue): number;
export declare function TRUNC(num: cellValue): number;
export declare function EVEN(num: cellValue): number;
export declare function ODD(num: cellValue): number;
export declare function ACOS(num: cellValue): number;
export declare function ACOSH(num: cellValue): number;
export declare function ACOT(num: cellValue): number;
export declare function ACOTH(num: cellValue): number;
export declare function ARABIC(num: cellValue): number;
export declare function ASIN(num: cellValue): number;
export declare function ASINH(num: cellValue): number;
export declare function ATAN(num: cellValue): number;
export declare function ATAN2(num1: cellValue, num2: cellValue): number;
export declare function ATANH(num: cellValue): number;
export declare function BASE(num: cellValue, radix: cellValue, minLength?: number): string;
export declare function CEILING(num: cellValue, significance?: number, mode?: number): number;
export declare function COS(num: cellValue): number;
export declare function COSH(num: cellValue): number;
export declare function COT(num: cellValue): number;
export declare function COTH(num: cellValue): number;
export declare function CSC(num: cellValue): number;
export declare function CSCH(num: cellValue): number;
export declare function DEGREES(num: cellValue): number;
export declare function DECIMAL(num: cellValue, radix: number): number;
export declare function FACT(num: cellValue): number;
export declare function FACTDOUBLE(num: cellValue): number;
export declare function COMBIN(num: cellValue, number_chosen: cellValue): number;
export declare function COMBINA(num: cellValue, number_chosen: cellValue): number;
export declare function FLOOR(num: cellValue, significance: number): number;
export declare function GCD(...rest: cellValue[]): number;
export declare function LN(num: cellValue): number;
export declare function LOG(num: cellValue, base?: cellValue): number;
export declare function LOG10(num: cellValue): number;
export declare function MOD(num: cellValue, divisor: cellValue): number;
export declare function MROUND(num: cellValue, factor: cellValue): number;
export declare function MULTINOMIAL(...rest: cellValue[]): number;
export declare function RADIANS(num: cellValue): number;
export declare function RANDBETWEEN(bottom: cellValue, top: cellValue): number;
export declare function ROMAN(num: cellValue): string;
export declare function SEC(num: cellValue): number;
export declare function SECH(num: cellValue): number;
export declare function SIN(num: cellValue): number;
export declare function SINH(num: cellValue): number;
export declare function SQRTPI(num: cellValue): number;
export declare function SUBTOTAL(function_code: cellValue, ...rest: cellValue[]): number;
export declare function ADD(num1: cellValue, num2: cellValue): number;
export declare function MINUS(num1: cellValue, num2: cellValue): number;
export declare function DIVIDE(num1: cellValue, num2: cellValue): number;
export declare function MULTIPLY(num1: cellValue, num2: cellValue): number;
export declare function GT(num1: cellValue, num2: cellValue): boolean;
export declare function GTE(num1: cellValue, num2: cellValue): boolean;
export declare function LT(num1: cellValue, num2: cellValue): boolean;
export declare function LTE(num1: cellValue, num2: cellValue): boolean;
export declare function EQ(v: cellValue, v2: cellValue): boolean;
export declare function NE(v: cellValue, v2: cellValue): boolean;
export declare function POW(base: cellValue, exponent: cellValue): number;
export declare function SUMX2MY2(array_x: cellValue[], array_y: cellValue[]): number;
export declare function SUMX2PY2(array_x: cellValue[], array_y: cellValue[]): number;
export declare function SUMXMY2(array_x: cellValue[], array_y: cellValue[]): number;
export declare function TAN(num: cellValue): number;
export declare function TANH(num: cellValue): number;
export declare function COMPLEX(real: cellValue, i: cellValue, suffix?: string): string;
export declare function CORREL(arr1: cellValue[], arr2: cellValue[]): number;
export declare function DEC2BIN(num: cellValue, places?: cellValue): string;
export declare function DEC2HEX(num: cellValue, places?: cellValue): string;
export declare function DEC2OCT(num: cellValue, places?: cellValue): string;
export declare function DELTA(num1: cellValue, num2: cellValue): number;
export declare function DEVSQ(...rest: cellValue[]): number;
export declare function ERF(num: cellValue): number;
export declare function ERFC(num: cellValue): number;
export declare function EXP(num: cellValue): number;
export declare function FISHER(num: cellValue): number;
export declare function FISHERINV(num: cellValue): number;
export declare function GAMMA(num: cellValue): number;
export declare function GEOMEAN(...rest: cellValue[]): number;
export declare function GESTEP(num: cellValue, step?: cellValue): number;
export declare function HARMEAN(...rest: cellValue[]): number | string;
export declare function HEX2BIN(num: cellValue, places?: cellValue): string;
export declare function HEX2DEC(num: cellValue, places?: cellValue): string;
export declare function HEX2OCT(num: cellValue, places?: cellValue): string;
export declare function IMREAL(inumber: cellValue): number | string;
export declare function IMAGINARY(inumber: cellValue): number | string;
export declare function IMABS(inumber: cellValue): number | string;
export declare function IMCONJUGATE(inumber: cellValue): string;
export declare function IMCOS(inumber: cellValue): string;
export declare function IMCOSH(inumber: cellValue): string;
export declare function IMCOT(inumber: cellValue): string;
export declare function IMCSC(inumber: cellValue): string;
export declare function IMCSCH(inumber: cellValue): string;
export declare function IMDIV(inumber1: cellValue, inumber2: string): string;
export declare function IMSIN(inumber: cellValue): string;
export declare function IMSINH(inumber: cellValue): string;
export declare function IMEXP(inumber: cellValue): string;
export declare function IMLN(inumber: cellValue): string;
export declare function IMPOWER(inumber: cellValue, pow: cellValue): string;
export declare function IMPRODUCT(...inumbers: cellValue[]): string;
export declare function IMSEC(inumber: cellValue): string;
export declare function IMSECH(inumber: cellValue): string;
export declare function IMSQRT(inumber: cellValue): string;
export declare function IMSUB(inumber1: cellValue, inumber2: string): string;
export declare function IMSUM(...inumbers: cellValue[]): string;
export declare function IMTAN(inumber: cellValue): string;
export declare function LARGE(arr: cellValue[], value: cellValue): number;
export declare function MEDIAN(...rest: cellValue[]): number;
export declare function OCT2BIN(num: cellValue, places?: cellValue): string;
export declare function OCT2DEC(num: cellValue, places?: cellValue): string;
export declare function OCT2HEX(num: cellValue, places?: cellValue): string;
export declare function PERMUT(num: cellValue, number_chosen: cellValue): number;
export declare function PERCENTILE(arr: cellValue[], k_value: cellValue): number;
export declare function QUARTILE(arr: cellValue[], q: cellValue): number;
export declare function SIGN(num: cellValue): number;
export declare function SMALL(arr: cellValue[], value: cellValue): number;
export declare function STEYX(arr1: cellValue[], arr2: cellValue[]): number;
export declare function WEIBULL(x: cellValue, alpha: cellValue, beta: cellValue, cumulative: cellValue): number;
export declare function AVEDEV(...rest: cellValue[]): number;
export declare function BINOMDIST(number_s: cellValue, trials: cellValue, probability_s: cellValue, cumulative?: cellValue): number;
export declare function BINOMDISTRANGE(trials: cellValue, probability_s: cellValue, number_s1: cellValue, number_s2: cellValue): number;
export declare function BINOMDISTINV(trials: cellValue, probability_s: cellValue, alpha: cellValue): number;
export declare function BITAND(num1: cellValue, num2: cellValue): number;
export declare function BITOR(num1: cellValue, num2: cellValue): number;
export declare function BITXOR(num1: cellValue, num2: cellValue): number;
export declare function BITLSHIFT(num: cellValue, amount: cellValue): number;
export declare function BITRSHIFT(num: cellValue, amount: cellValue): number;
export declare function COVAR(arr1: cellValue[], arr2: cellValue[]): number;
