class DataStore {
	
	constructor(){
		this.ls = window.localStorage;
	}
	
	AddData(table, row){
		var tableData = this.ls.getItem(table);
		if (tableData == null) {	
			row.id = 1;
			tableData = [row];
		} else {
			tableData = JSON.parse(tableData);			
			row.id = tableData.length + 1;
			tableData.push(row);
		}		
		this.ls.setItem(table, JSON.stringify(tableData));			
	}
	
	GetDataById(table, id){
		var tableData = this.ls.getItem(table);
		if (tableData != null) {		
			tableData = JSON.parse(tableData);			
			return tableData[id-1];
		}
		return null;
	}
	
	GetTableData(table){
		var tableData = this.ls.getItem(table);
		if (tableData != null) {		
			tableData = JSON.parse(tableData);			
			return tableData;
		}
		return null;
	}
	
	SaveTableData(table, data){
		this.ls.setItem(table, JSON.stringify(data));
	}		
}

export const dataStore = new DataStore();