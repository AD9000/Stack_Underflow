import uuid

"""
A function that generates a random interger id
for user using MAC address and time component.
""" 
def generate_uid():
    #int: Returns id in form of 128-bit integer
    id = uuid.uuid1().int
    return id

#Test
"""
if __name__ == "__main__":
    id = generate_uid()
    print(id)
"""

