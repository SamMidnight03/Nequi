// C=create R=read U=update D=delete ; CRUD

class Item{
    constructor(id, name, valor){
        this.id = id;
        this.name = name;
        this.valor = valor
    };
};
 
class CRUD {
    constructor(){
        this.from = document.getElementById("crud-from");
        this.nameImput = document.getElementById("name");
        this.valorImput = document.getElementById("valor");
        this.idImput = document.getElementById("id");
        this.tableBody = document.getElementById("crud-table-body");
        this.loadItems();
        this.form.addEventListener('submit', (e)=> this.saveIten(e)); //guarda lo del input en la variable
    }

    loadItems(){
        const itemJSON = localStorage.getItem('items');
        let items = [];
        if (itemJSON){
            // try                                    catch
            // JSON.parse convierte a formato JSON // recibe los errore; guarde el error en e y lo muestra
            try {
                items = JSON.parse(itemJSON);
            } catch (e) {
                console.log("Error parsing JSON from localStorage: ", e);
                items = [];
            }
        }

        // Crea la tabla
        this.tableBody.innerHTML = ' ';
        items.forEach(item => {
            const {id, name, valor} = item
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${valor}</td>
                <td>
                    <button class="update" onclick="crud.editItem(${id})">Actualizar</button>
                    <button class="delete" onclick="crud.deleteItem(${id})">Actualizar</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    saveIten(items){
        localStorage.setItem('items', JSON.stringify(items));
        this.locadItems();
    }



     saveIten(e){
         e.preventDefault();
         const name = this.nameInput.value.trim();
         const valor = this.valorInput.value.trim();
         const id = this.idInput.value;
         const items = JSON.parse(localStorage.getItem('items')) || [];
         if (id === '') {
             // Add new item
             const newItem = new Item(Date.now(), name, valor);
             items.push(newItem);
         } else {
             // Update existing item
             const index = items.findIndex(item => item.id == id);
             items[index].name = name;
             items[index].valor = valor;
         }
         this.saveItems(items);
         this.form.reset();
     }

     editItem(id) {
         const items = JSON.parse(localStorage.getItem('items')) || [];
         const item = items.find(item => item.id == id); // metodo find
         this.nameInput.value = item.name;
         this.valorImput.value = item.c=valor;
         this.idInput.value = item.id;
     }

      deleteItem(id) {
         let items = JSON.parse(localStorage.getItem('items')) || [];
         items = items.filter(item => item.id != id); // metodo filter
         this.saveItems(items);
     }
};

const crud = new CRUD();