# Сортировка слиянием
## Анализ сложности:
- **n** - количество элементов в массиве
- **log(n)** - количество раз, которое массив разбивается на две равные части


- Лучший случай: **O(n * log(n))**
    - Отсортированный массив все равно разбивается на две равные части, а затем эти части сортируются и объединяются.
- Худший случай: **O(n * log(n))**
    - Отсортированный в обратном требуемому порядке массив (ASC -> DESC) разбивается на две равные части, а затем эти части сортируются и объединяются.

## Псевдокод:

```
function mergeSort(arr, order)
	// Если массив состоит из одного элемента, он уже отсортирован
	if length of arr <= 1
	return arr

    middle = floor(length of arr / 2)
    left = slice of arr from 0 to middle
    right = slice of arr from middle to end

	// Рекурсивно разбиваем массив на две части
	// и сортируем каждую из них - сложность операции O(log(n)),
	// поскольку массив делится на две равные части
    sortedLeft = mergeSort(left, order)
    sortedRight = mergeSort(right, order)

	// Объединяем два отсортированных массива
	// Сложность операции O(n), поскольку мы проходим по каждому элементу
    return merge(sortedLeft, sortedRight, order)

function merge(left, right, order)
	result = []
	
	leftIndex = 0
	rightIndex = 0

	// Сравниваем элементы из двух массивов, пока не закончатся элементы в одном из них
	// и добавляем минимальный элемент в результирующий массив
	// Сложность операции O(n), поскольку мы проходим по каждому элементу
    while leftIndex < length of left and rightIndex < length of right
        if order is ASC and left[leftIndex] < right[rightIndex]
            push left[leftIndex] to result
            leftIndex++
        else if order is DESC and left[leftIndex] > right[rightIndex]
            push left[leftIndex] to result
            leftIndex++
        else
            push right[rightIndex] to result
            rightIndex++

	// Сложность операции O(n), поскольку мы проходим по каждому элементу
    concatenate remaining elements of left from leftIndex to result
    concatenate remaining elements of right from rightIndex to result

    return result
```
## Визуализация <strike> + арбитраж + твой папа + мой папа</strike>
<div style="text-align: center">
<img alt="Merge sort animation" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif" width="350"/>
</div>
