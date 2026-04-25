#!/usr/bin/env python3

# A simple function that calculates the factorial of a number
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    else:
        return n * factorial(n - 1)