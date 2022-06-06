const uri = '/api/TodoItems';
const uri2 = '/api/TodoItemTypes';
let todos = [];

function getItems(find = null, type = null) {
    if (find === null & type === null)
        fetch(uri)
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error('Unable to get items.', error));
    else if (type === null)
        fetch(uri + "?find=" + find.toString())
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error('Unable to get items.', error));
    else if (find === null)
        fetch(uri + "?type=" + type.toString())
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error('Unable to get items.', error));
    else
        fetch(uri + "?type=" + type.toString() + "&find=" + find.toString())
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error('Unable to get items.', error));
    fetch(uri2)
        .then(response => response.json())
        .then(data => _displayTypes(data))
        .catch(error => console.error('Unable to get items.', error));
}

function _displayTypes(data) {
    //console.log(data);
    var select = document.getElementById('find-select-type');
    //console.log(select.options.length);
    //console.log(select.options.length > 1);
    while (select.options.length > 1) {
        //console.log(select.options[1]);
        select.options.remove(1);
    }
    //console.log(select);
    //console.log(select.options.length);
    data.forEach(item => {
        //console.log(select.options);
        var el = new Option();
        //console.log(el);
        el.textContent = item;
        select.add(el);
        //console.log(select);
    });
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addTypeTextbox = document.getElementById('add-type');

    const item = {
        isComplete: document.getElementById('add-isComplete').checked,
        name: addNameTextbox.value.trim(),
        type: addTypeTextbox.value.trim()
    };

    fetch(uri,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-type').value = item.type;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim(),
        type: document.getElementById('edit-type').value.trim(),
    };

    fetch(uri + '/' + itemId,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function deleteItem(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('delete-name').value = item.name;
    document.getElementById('delete-type').value = item.type;
    document.getElementById('delete-id').value = item.id;
    document.getElementById('delete-isComplete').checked = item.isComplete;
    document.getElementById('deleteForm').style.display = 'block';
}

function updateItem1() {
    const itemId = document.getElementById('delete-id').value;

    fetch(uri + '/' + itemId,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput1();

    return false;
}

function closeInput1() {
    document.getElementById('deleteForm').style.display = 'none';
}

function updateItem2() {
    var itemName = document.getElementById('find-name').value;
    if (itemName == "") itemName = null;
    console.log(document.getElementById('find-select-type').value);
    console.log(document.getElementById('find-select-type-default').textContent);
    var itemType = document.getElementById('find-select-type').value;
    if (itemType == document.getElementById('find-select-type-default').textContent) itemType = null;
    console.log(itemName);
    console.log(itemType);

    getItems(
        itemName,
        itemType
    );

    return false;
}

function closeInput2() {
    getItems()
        .catch(error => console.error('Unable to update item.', error));
}


function _displayCount(itemCount) {
    document.getElementById('counter').textContent = "Количество записей: " + itemCount;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', 'displayEditForm(' + item.id + ')');

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', 'deleteItem(' + item.id + ')');

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode1 = document.createTextNode(item.type);
        td3.appendChild(textNode1);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    todos = data;
}