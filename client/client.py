from kodemon import kodemon

@kodemon
def fibo(n):
    return_list = []
    a, b = 0, 1
    while b < n:
        a, b = b, a + b
        return_list.append(b)

@kodemon
def libo(a, b):
    return a + b

if __name__ == '__main__':
    fibo(10000)
    libo(2, 3)
