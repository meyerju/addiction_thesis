
export default (() => {

    const presentOneTableElement = (row, cell) => {

        if(cell.id === "addiction_name"){
            return row[cell.id]
        }
        return row.person[cell.id];
    };

    const presentForTable = () => {
        return [
            { id: 'name', label: "Name", type:"string"},
            { id: 'surname', label: "Surname", type:"string"},
            { id: 'gender', label: "Gender", type:"string"},
            { id: 'addiction_name', label: "Addiction", type:"string"},
        ]
    };

    return {
        presentForTable,
        presentOneTableElement
    };
})();