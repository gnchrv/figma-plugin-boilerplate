export function stick(axis: 'x' | 'y', ascending: boolean) {
    const selection = figma.currentPage.selection

    // Выходим, если выбрано меньше двух элементов
    if (selection.length < 2)
        return figma.closePlugin('Select at least two elements')

    // Сортируем по возрастанию координаты вдоль оси
    let sorted = [...selection].sort((a, b) => a[axis] - b[axis])
    if (!ascending) sorted = sorted.reverse()

    const size = axis == 'x' ? 'width' : 'height'
    
    for (let i = 0; i < sorted.length; i++) {
        // Не трогаем первый элемент: он не смещается
        if (i == 0) continue
        
        const currentNode = sorted[i]
        const baseNode = sorted[i - 1]
        currentNode[axis] = ascending ?
            baseNode[axis] + baseNode[size] :
            baseNode[axis] - currentNode[size]
    }

    figma.closePlugin()
}

export function nudge(amount: number, i: number, j: number) {
    const selection = figma.currentPage.selection
    for (const node of selection) {
        node.x = node.x + amount * i
        node.y = node.y + amount * j
    }
    figma.closePlugin()
}