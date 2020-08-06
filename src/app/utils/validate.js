import _ from 'lodash';

/* -------------Adding Validators -------------- */


export const isEmpty = (value) => _.isEmpty(value);
export const isNotEmpty = (value) => !isEmpty(value);
export const checkLength = (value, len) => Boolean(value.length < len);
export const regexCheck = (value, regexExpression) => !regexExpression.test(value);
export const isEqual = (a, b) => _.isEqual(a, b);
export const isNotEqual = (a, b) => !isEqual(a, b);

/*------------------------------------------------*/


/*-------------- REGEX EXPRESSIONS ----------------*/


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/*----------------------------------------------------*/


/*-------------- VALIDATION EXECUTOR------------------*/

export const validatePassword = (value) =>
    (isEmpty(value)) ?
        'Password is required !' :
        checkLength(value, 8) ?
            'Password should be minimum of min 8 characters!' :
            regexCheck(value, passwordRegex) ?
                `Your password must contain at least one lowercase letter,
     one capital letter, one special character and one number!` : "";


export const validateEmail = (value) =>
    (isEmpty(value)) ?
        `Email is Required !` :
        regexCheck(value, emailRegex) ?
            `Please enter a valid email!` : "";

export const checkConfirmPassword = (password, confirmPassword) =>
    isEmpty(confirmPassword) ?
        'Please enter confirm password!' :
        isNotEqual(password, confirmPassword) ?
            'Password must match!' : "";

/*------------------------------------------------------ */