from kodemon import kodemon

@kodemon
def fibo(n):
    return_list = []
    a, b = 0, 1
    while b < n:
        a, b = b, a + b
        return_list.append(b)

if __name__ == '__main__':
    while True:
        fibo(10000)
