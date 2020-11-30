class student {

	constructor(id, name, email, date) {
		this.id=id;
		this.name=name;
		this.email=email;
		this.date=date;
	}
}

var a = [];

a.push(new student("SV01", "Nam", "nam@gmail.com", "2000-11-03"));
a.push(new student("SV02", "Hoàng", "hoang@gmail.com", "2000-11-03"));

function loadstd(){
	var rows = '';
	for(var st of a){
		rows +=`<tr data-id="${st.id}">
					<td>${st.id}</td>
					<td>${st.name}</td>
					<td>${st.email}</td>
					<td>${st.date}</td>
				</tr>`;
	}
	$(".tbl").html(rows);
}

$(function(){
	loadstd();
	$(".add").click(function(){
		var st = new student();
		st.id=$(".id").val();
		st.name=$(".name").val();
		st.email=$(".email").val();
		st.date=$(".date").val();
		a.push(st);
		loadstd();
	})

	$(document).on("click", ".tbl tr", function(){
		var id = $(this).data("id");
		var st = a.find(x=> x.id == id);
		$(".id").val(st.id);
		$(".name").val(st.name);
		$(".email").val(st.email);
		$(".date").val(st.date);
	});

	$(".edit").click(function(){
		var st = new student();
		st.id=$(".id").val();
		st.name=$(".name").val();
		st.email=$(".email").val();
		st.date=$(".date").val();
		a = a.map(x => {
			if (x.id == st.id) {
				x = st;
			}
			return x;
		});
		loadstd();
	});

	$(".delete").click(function(){
		if(confirm("Do you want to delete?")){
			var id = $(".id").val();
			var index = a.findIndex(x => x.id == id);
			a.splice(index, 1);
			loadstd();
		}
	})
})