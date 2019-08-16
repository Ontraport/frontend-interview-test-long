var DataStore = {
	"ls" : window.localStorage,
	
	"AddData" : function(table, row){
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
	},
	
	"GetDataById" : function(table, id){
		var tableData = this.ls.getItem(table);
		if (tableData != null) {		
			tableData = JSON.parse(tableData);			
			return tableData[id-1];
		}
		return null;
	},
	
	"GetTableData" : function(table){
		var tableData = this.ls.getItem(table);
		if (tableData != null) {		
			tableData = JSON.parse(tableData);			
			return tableData;
		}
		return null;
	},
	
	"SaveTableData" : function(table, data){
		this.ls.setItem(table, JSON.stringify(data));
	}	
	
}