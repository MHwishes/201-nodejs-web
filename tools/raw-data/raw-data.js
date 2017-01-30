data = {
    Item: [
        {
            id: '1',
            name: '苹果',
            categoryId: '1'
        },
        {
            id: '2',
            name: '梨',
            categoryId: '1'
        },
        {
            id: '3',
            name: '电池',
            categoryId: '2'
        }
    ],
    Category: [
        {
            categoryId: '1',
            categoryName: '水果',
            cartId: '1'
        },
        {
            categoryId: '2',
            categoryName: '电子产品',
            cartId: '1'
        }
    ],
    Cart: [
        {
            cartId: '1',
            items: [{
                item: '1',
                count: 1
            }, {
                item: '2',
                count: 1
            }, {
                item: '3',
                count: 1
            }]
        },
        {
            cartId: '2',
            items: [{
                item: '苹果',
                count: 1
            }, {
                item: '梨',
                count: 1
            }, {
                item: '草莓',
                count: 1
            }]
        }
    ]

};
module.exports = data;