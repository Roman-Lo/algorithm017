function recursion (input) {
    // terminator
    if (!input) return;

    // logic
    input += 1;

    // drill down
    return recursion(input);

    // reverse state
}

recursion(1);
