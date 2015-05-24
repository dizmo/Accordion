/**
 * Constructor for assert exception taking a `message` as an optional parameter.
 */
function AssertException(message) {
    this.message = message;
}

AssertException.prototype.toString = function () {
    return 'AssertException: ' + this.message;
};

/**
 * Throws an `AssertException` if `!expression` is true, where the `message`
 * parameter is an optional description; otherwise returns the `expression` as
 * it is is allowing chaining and assertion embedding.
 */
function assert(expression, message) {
    if (!expression) {
        throw new AssertException(message);
    }

    return expression;
}
