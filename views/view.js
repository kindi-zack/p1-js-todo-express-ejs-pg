
class View {
    static viewTemplate() {
        console.log('### THIS IS VIEW ###')
    }

    static showErr(err) {
        this.viewTemplate()
        console.log("### ERROR ###")
        console.log(err)
    }

    static list(data) {
        this.viewTemplate()
        console.log(data)
    }

    static addTodo(data) {
        this.viewTemplate()
        let { todo:kegiatan } = data

        console.log(`todo baru dengan nama "${kegiatan}" berhasi ditambahkan`)
    }

    static editTodo(dataEdit) {
        let {id, todo} = dataEdit
        console.log("### Edit Sukses ###")
        console.log('todo dengan id '+id +`====> "${todo}" berhasil di edit`)
    }

    static findById(data) {
        console.log(data)
    }

    static deltTodo(data) {
        let { todo, id } = data
        console.log(`Berhasil Delete todo dengan id ${id} ==> "${todo}"`)
    }
}

module.exports = View