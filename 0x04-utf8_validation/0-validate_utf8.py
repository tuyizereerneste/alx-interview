#!/usr/bin/python3
""" UTF-8 validation module
"""


def validUTF8(data):
    """ Function that determines if a given data set
    represents a valid UTF-8 encoding.
    Arguments:
        data
    Return:
        True or False
    """
    count = 0

    for i in data:
        if count == 0:
            if i >> 5 == 0b110 or i >> 5 == 0b1110:
                count = 1
            elif i >> 4 == 0b1110:
                count = 2
            elif i >> 3 == 0b11110:
                count = 3
            elif i >> 7 == 0b1:
                return False
        else:
            if i >> 6 != 0b10:
                return False
            count -= 1
    return count == 0
