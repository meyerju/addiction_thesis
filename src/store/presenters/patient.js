
export default (() => {

    const presentOneTableElement = (row, cell) => {

        if(cell.id === "addiction_name"){
            return row[cell.id]
        }
        return row.person[cell.id];
    };

    const presentForTable = () => {
        return [
            { id: 'name', label: "Identifier", type:"string"},
            { id: 'gender', label: "Gender", type:"string"},
            { id: 'addiction_name', label: "Addiction", type:"string"},
            { id: 'description', label: "Description", type:"string"},
        ]
    };

    const present = (patient) => {
        return [
            { label: "Identifier", value:patient.person.name},
            { label: "Addiction", value:patient.addiction_name},
            { label: "Description", value:"From the last self-tracking period, it was concluded that consumption will not be tracked anymore, as the patient enters in a alcohol withdrawal. Instead, the patient will track times when he is calling his mother, which turned out to be a signifiant source of stress. "},
        ]
    };

    return {
        presentForTable,
        presentOneTableElement,
        present
    };
})();