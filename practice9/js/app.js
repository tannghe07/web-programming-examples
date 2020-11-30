class Student {
	// Hàm khởi tạo
	constructor(id, name, address, email, phone, birthday) {
		// Khai báo thuộc tính của đối tượng sinh viên (bản chất là khái báo biến)
		// từ khóa this đại diện cho đối tượng sinh viên
		// validate 5 kí tự, bắt đầu chữ HOA và 4 số
		this.id = id;
		// TEN IN HOA KHONG DAU
		this.name = name;
		this.address = address;
		// Email đúng định dạng
		this.email = email;
		// SĐT đúng định dạng
		this.phone = phone;
		// Ngày sinh đúng định dạng ngày tháng
		this.birthday = birthday;
	}
	// GETTER/SETTER
	setId(id) {
		if (!(/^[A-Z]\d{4}$/.test(id)))
			throw 'Mã sinh viên sai định dạng!';
		this.id = id;
	}
	getId() {
		return this.id;
	}
	setName(name) {
		let check = /^[A-Z\s]+$/.test(name);
		if (!check)
			throw 'TÊN PHẢI NHẬP IN HOA';
		this.name = name;
	}
	getName() {
		return this.name;
	}
	setAddress(address) {
		this.address = address;
	}
	getAddress() {
		return this.address;
	}
	setEmail(email) {
		if (!(/^\w+@\w+.*?\.[a-z]{2,5}$/.test(email)))
			throw 'Email sai định dạng!';
		this.email = email;
	}
	getEmail() {
		return this.email;
	}
	setPhone(phone) {
		if (!(/^(0[98753])\d{8}$/.test(phone)))
			throw 'Số điện thoại sai định dạng!';
		this.phone = phone;
	}
	setBirthday(birthday) {
		if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(birthday)))
			throw 'Ngày tháng chưa đúng định dạng!';4
		this.birthday = birthday;
	}
	getBirthday(){
		return this.birthday;
	}
}

// Tạo mảng lưu danh sách sinh viên
var students = [];
// Thêm sinh viên vào mảng
students.push(new Student("SV01", "Nam", "HN", "nam@gmail.com", "0987654321", "2000-11-03"));
students.push(new Student("SV02", "Hoàng", "HN", "hoang@gmail.com", "0987654321", "2000-11-03"));
// Hàm hiển thị dữ liệu trong mảng sinh viên lên table
function loadStudent(){
	var rows = '';// biến chứa các <tr>
	for(var st of students){
		// Đọc dữ liệu của một đối tượng sinh viên vào tr
		rows += `<tr data-id="${st.id}">
					<td>${st.id}</td>
					<td>${st.name}</td>
					<td>${st.email}</td>
					<td>${st.address}</td>
					<td>${st.phone}</td>
					<td>${st.birthday}</td>
				</tr>`;
	}
	// Đưa các <tr> vào <tbody> trong <table>
	$(".table").html(rows);
}
$(function(){
	// Gọi hàm hiển thị dữ liệu
	loadStudent();
	$(".btn-add").click(function(event) {
		// Lấy dữ liệu trên form về
		var st = new Student();
		st.id = $("#Id").val();
		st.name = $("#Name").val();
		st.email = $("#Email").val();
		st.address = $("#Address").val();
		st.phone = $("#Phone").val();
		st.birthday = $("#Birthday").val();
		console.log(st);
		// Đẩy đối tượng vào mảng
		students.push(st);
		// Hiển thị lại
		loadStudent();
	});
	// $(".tbl_students tr").click(function(event) {
	// 	/* Act on the event */
	// 	alert("AAAA");
	// });
	$(document).on("click", ".table tr", function(){
		// Lấy id từ thuộc tính data-... của thẻ
		var id = $(this).data("id");
		// alert(id);
		// Tìm sinh viên muốn sửa trong mảng
		var st = students.find(x => x.id == id);
		// Đưa dữ liệu sv cần sửa lên form
		$("#Id").val(st.id);
		$("#Name").val(st.name);
		$("#Email").val(st.email);
		$("#Address").val(st.address);
		$("#Phone").val(st.phone);
		$("#Birthday").val(st.birthday);
	})

	$(".btn-edit").click(function(event) {
		// Lấy dữ liệu trên form về
		var st = new Student();
		st.id = $("#Id").val();
		st.name = $("#Name").val();
		st.email = $("#Email").val();
		st.address = $("#Address").val();
		st.phone = $("#Phone").val();
		st.birthday = $("#Birthday").val();
		console.log(st);
		// Update
		students = students.map(x => {
			if (x.id == st.id) {
				x = st
			}
			return x;
		});
		// Load lại dữ liệu mới update
		loadStudent();
	});
	$(".btn-del").click(function(event) {
		if (confirm("bạn có muốn xóa không?")) {
			// Lấy id
			var id = $("#Id").val();
			// tìm vị trí của đối tượng
			var index = students.findIndex(x => x.id == id);
			// Xóa
			students.splice(index, 1);
			// Load lại dữ liệu mới update
			loadStudent();
		}
	});
})