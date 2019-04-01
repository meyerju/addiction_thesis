
export default (() => {

    const presentDateAsString = (elementDate) => {
        if (!elementDate) {
            return "";
        }
        return elementDate.getDay() + "/" + elementDate.getMonth() + "/" + elementDate.getFullYear()
    };

    const presentArrayAsString = (elementArray) => {
        let displayedName = "";
        elementArray.map(elt => {
            displayedName+=elt+" "
        });
        return elementArray.length+": "+displayedName;
    };

    const presentOneTableElement = (row, cell) => {
        if(!cell.type){
            return '';
        }
        if(cell.type == "array"){
            return presentArrayAsString(row[cell.id]);
        }
        if(cell.type =="date"){
            return presentDateAsString(row[cell.id]);
        }
        return row[cell.id];
    };

    const presentForTable = () => {
        return [
            { id: 'id', label: "Identifier", type:"string"},
            { id: 'name', label: "Name", type:"string"},
            { id: 'surname', label: "Surname", type:"string"},
            { id: 'gender', label: "Gender", type:"string"},
            { id: 'last_update', label: "Last Updated", type:"date"},
        ]
    };

    return {
        presentForTable,
        presentOneTableElement
    };
})();