var vm = new Vue({
    el: '#app',
    data: {
        checkedAll: false,
        list: [
            {
                category: "电子产品",
                checked: false,
                items: [
                    {
                        id: 1,
                        name: 'iphone7',
                        price: 6188,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 2,
                        name: 'ipad pro',
                        price: 5888,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 3,
                        name: 'macbook pro',
                        price: 21488,
                        count: 1,
                        checked: false
                    }
                ]
            },
            {
                category: "生活用品",
                checked: false,
                items: [
                    {
                        id: 1,
                        name: '肥皂',
                        price: 5,
                        count: 1,
                        checked: true
                    },
                    {
                        id: 2,
                        name: '洗洁精',
                        price: 15,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 3,
                        name: '洗衣粉',
                        price: 10,
                        count: 1,
                        checked: false
                    },
                    
                ]
            },
            {
                category: "果蔬",
                checked: false,
                items: [
                    {
                        id: 1,
                        name: '菠萝',
                        price: 10,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 2,
                        name: '西瓜',
                        price: 30,
                        count: 1,
                        checked: false
                    },
                    {
                        id: 3,
                        name: '樱桃',
                        price: 50,
                        count: 1,
                        checked: false
                    },
                    
                ]
            }

        ]
        
        
    },
    computed: {
        totalPrice: function(){
            var total = 0
            for(var i=0; i< this.list.length; i++){
                var cate = this.list[i]
                for(var j=0;j<cate.items.length;j++){
                    var item = cate.items[j]
                    if(item.checked){
                        total += item.price * item.count
                    }
                }
                
            }
            // 千位分隔符
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
            // return total
        },
        allItemCount: function(){

            var count = 0
            for(var i=0; i< this.list.length; i++){
                var cate = this.list[i]
                for(var j=0;j<cate.items.length;j++){
                    // var item = cate.items[j]
                    count++
                }
            }
            return count
        },
        // 计算选中的个数 
        checkedCountAct: function(){
            var count = 0
            for(var i=0; i< this.list.length; i++){
                var cate = this.list[i]
                for(var j=0;j<cate.items.length;j++){
                    if( cate.items[j].checked ){
                        count++
                    }
                }
            }
            return count
        }
    },
    methods: {
        handleReduce: function(catIndex,index){
            if(this.list[catIndex].items[index].count === 1) return
            this.list[catIndex].items[index].count--
        },
        handleAdd: function(catIndex,index){
            this.list[catIndex].items[index].count++
        },
        handleRemove: function(catIndex,index){
            this.list[catIndex].items.splice(index,1)
        },
        checkItem: function(catIndex,index){
            this.list[catIndex].items[index].checked = !this.list[catIndex].items[index].checked
            
            if(!this.list[catIndex].items[index].checked){
                this.checkedAll = false
                this.list[catIndex].checked = false
                
                
            }else{
                var catFlag = true
                for(var i=0;i<this.list[catIndex].items.length;i++){
                    
                    if( !this.list[catIndex].items[i].checked ){
                        catFlag = false
                    }
                }
                if(catFlag){
                    this.list[catIndex].checked = true
                }
                if(this.checkedCountAct === this.allItemCount){
                    this.checkedAll = true
                }
            }
        },
        checkItemAll: function(){
            this.checkedAll = !this.checkedAll
           
            
            for(var i=0; i< this.list.length; i++){
                var cate = this.list[i]
                cate.checked = this.checkedAll
                for(var j=0;j<cate.items.length;j++){
                    var item = cate.items[j]
                    item.checked = this.checkedAll
                }
            }
        },
        checkCat: function(catIndex){
            this.list[catIndex].checked = !this.list[catIndex].checked
            var items = this.list[catIndex].items
            for(var i=0;i<items.length;i++){
                
                
                items[i].checked = this.list[catIndex].checked
                
            }
            if(this.checkedCountAct === this.allItemCount){
                this.checkedAll = true
            }else{
                this.checkedAll = false
            }
            
        }
    }
});
