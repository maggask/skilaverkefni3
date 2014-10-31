from kodemon import kodemon

@kodemon
def fibonacci(n):
    return_list = []
    a, b = 0, 1
    while b < n:
        a, b = b, a + b
        return_list.append(b)

@kodemon
def addTwo(a, b):
    return a + b

@kodemon
def printHello():
    print 'Hello world!'

if __name__ == '__main__':
    fibonacci(10000)
    addTwo(2, 3)
    printHello()
