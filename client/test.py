import numpy as np

def generation(stopping):
    arr = [i for i in range(1, 101)]
    np.random.shuffle(arr)
    metric = max(arr[:stopping])
    for item in arr[stopping:-1]:
        if item > metric:
            return item
    return arr[-1]

def testRun(n, stopping):
    results = []
    for i in range(n):
        results.append(generation(stopping))
    # return np.mean(results)
    successes = len([i for i in results if i == 100])
    return successes / n

bestAvg = 0
bestStop = -1
for stop in range(1, 100):
    avg = testRun(1000, stop)
    if avg > bestAvg:
        bestAvg = avg
        bestStop = stop
print(bestAvg, bestStop, testRun(10000, bestStop))
