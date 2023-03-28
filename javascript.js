$(document).ready(function () {
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    //Link nguồn
    const gDRINK_URL = "https://203.171.20.210:8080/devcamp-pizza365/drinks";
    const gVOUCHER_URL =
        "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail/";
    const gORDER_URL = "http://203.171.20.210:8080/devcamp-pizza365/orders";
    // Khai báo biến đối tượng combo kích cỡ pizza
    var gComboObj = "";
    // Khai báo biến lưu combo loại pizza
    var gPizzaType = "";
    // Khai báo đói tượng lưu trữ thông tin đơn hàng
    var gOrderInfor = {
        menu: "",
        loaiPizza: "",
        voucher: "",
        drink: "",
        discount: "",
        hoVaTen: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: "",
        actualPrice: function () {
            var vActualPriceVND =
                this.menu.priceVND * (1 - this.discount * 0.01);
            return vActualPriceVND;
        },
    };
    var gDrinks = [
        {
            maNuocUong: "TRATAC",
            tenNuocUong: "Trà tắc",
            donGia: 10000,
            ghiChu: null,
            ngayTao: 1615177934000,
            ngayCapNhat: 1615177934000,
        },
        {
            maNuocUong: "COCA",
            tenNuocUong: "Cocacola",
            donGia: 15000,
            ghiChu: null,
            ngayTao: 1615177934000,
            ngayCapNhat: 1615177934000,
        },
        {
            maNuocUong: "PEPSI",
            tenNuocUong: "Pepsi",
            donGia: 15000,
            ghiChu: null,
            ngayTao: 1615177934000,
            ngayCapNhat: 1615177934000,
        },
        {
            maNuocUong: "LAVIE",
            tenNuocUong: "Lavie",
            donGia: 5000,
            ghiChu: null,
            ngayTao: 1615177934000,
            ngayCapNhat: 1615177934000,
        },
        {
            maNuocUong: "TRASUA",
            tenNuocUong: "Trà sữa trân châu",
            donGia: 40000,
            ghiChu: null,
            ngayTao: 1615177934000,
            ngayCapNhat: 1615177934000,
        },
        {
            maNuocUong: "FANTA",
            tenNuocUong: "Fanta",
            donGia: 15000,
            ghiChu: null,
            ngayTao: 1615177934000,
            ngayCapNhat: 1615177934000,
        },
    ];
    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
    // Sự kiện load trang
    onPageLoading();
    // Tạo sự kiện cho các nút nhấn
    $("#btn-small").on("click", function () {
        onBtnSmallComboClick();
    });
    $("#btn-medium").on("click", function () {
        onBtnMediumComboClick();
    });
    $("#btn-large").on("click", function () {
        onBtnLargeComboClick();
    });
    $("#btn-seafood").on("click", function () {
        onBtnSeafoodComboClick();
    });
    $("#btn-hawaii").on("click", function () {
        onBtnHawaiiComboClick();
    });
    $("#btn-bacon").on("click", function () {
        onBtnBaconComboClick();
    });
    $("#btn-send").on("click", function () {
        onBtnSendClick();
    });
    $("#btn-create-order").on("click", function () {
        onBtnCreateOrderClick();
    });
    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
    // Hàm xử lí sự kiện load trang
    function onPageLoading() {
        "use strict";
        // Gọi Api lấy danh sách đồ uống
        // callApiGetAllDrink();
        loadDrinkToSelect(gDrinks);
    }
    // Hàm xử lí sự kiện nhấn nút tạo đơn trên modal
    function onBtnCreateOrderClick() {
        "use strict";
        callApiCreateOrder(gOrderInfor); // Gọi api tạo đơn hàng mới
    }
    // Hàm xử lí sự kiện nhấn nút send
    function onBtnSendClick() {
        "use strict";
        //B1: Thu thập dữ liệu
        readDataPizza(gOrderInfor);
        //B2: kiểm tra dữ liệu
        var vValidateResult = validateDataPizza(gOrderInfor);
        //B3: Gọi Api voucher nếu Mã voucher được nhập
        if (gOrderInfor.voucher != "") {
            callApiGetVoucherByVoucherCode(gOrderInfor);
        } else {
            gOrderInfor.discount = 0;
        }
        // B4: Xử lí hiển thị lên modal
        if (vValidateResult) {
            console.log("%cThông tin đơn hàng: ", "color:green");
            console.log(gOrderInfor);
            displayInforToModal(gOrderInfor);
            $("#order-modal").modal("show");
        }
    }
    // Hàm xử lí sự kiện nhấn nút chọn small pizza
    function onBtnSmallComboClick() {
        "use strict";
        console.log("%cNút chọn small pizza được nhấn", "color:orange");
        console.log("%cCombo đã chọn: ", "color:orange");
        changeColor("Small");
        gComboObj = getPizza("Small", 20, 2, 200, 2, 150000); // Gọi hàm tạo đối tượng combo pizza small
        console.log(gComboObj);
    }
    // Hàm xử lí sự kiện nhấn nút chọn small pizza
    function onBtnMediumComboClick() {
        "use strict";
        console.log("%cNút chọn medium pizza được nhấn", "color:orange");
        console.log("%cCombo đã chọn: ", "color:orange");
        changeColor("Medium");
        gComboObj = getPizza("Medium", 25, 4, 300, 3, 200000); // Gọi hàm tạo đối tượng combo pizza medium
        console.log(gComboObj);
    }
    // Hàm xử lí sự kiện nhấn nút chọn small pizza
    function onBtnLargeComboClick() {
        "use strict";
        console.log("%cNút chọn large pizza được nhấn", "color:orange");
        console.log("%cCombo đã chọn: ", "color:orange");
        changeColor("Large");
        gComboObj = getPizza("Large", 30, 8, 500, 4, 250000); // Gọi hàm tạo đối tượng combo pizza large
        console.log(gComboObj);
    }
    // Hàm xử lí sự kiện nhấn nút chọn loại pizza hải sản
    function onBtnSeafoodComboClick() {
        "use strict";
        console.log("%cNút chọn seafood pizza được nhấn", "color:orange");
        console.log("%cLoại Pizza đã chọn: ", "color:orange");
        changeColor("Seafood");
        gPizzaType = getPizzaType("OCCEAN MANIA"); // Gọi hàm tạo đối tượng combo pizza large
        console.log(gPizzaType);
    }
    // Hàm xử lí sự kiện nhấn nút chọn loại pizza hawaii
    function onBtnHawaiiComboClick() {
        "use strict";
        console.log("%cNút chọn hawaii pizza được nhấn", "color:orange");
        console.log("%cLoại Pizza đã chọn: ", "color:orange");
        changeColor("Hawaii");
        gPizzaType = getPizzaType("HAWAIIAN"); // Gọi hàm tạo đối tượng combo pizza large
        console.log(gPizzaType);
    }
    // Hàm xử lí sự kiện nhấn nút chọn loại pizza Bacon
    function onBtnBaconComboClick() {
        "use strict";
        console.log("%cNút chọn chicken bacon pizza được nhấn", "color:orange");
        console.log("%cLoại Pizza đã chọn: ", "color:orange");
        changeColor("Bacon");
        gPizzaType = getPizzaType("CHEESY CHICKEN BACON"); // Gọi hàm tạo đối tượng combo pizza large
        console.log(gPizzaType);
    }
    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
    // Hàm xử lí hiển thị thông tin lên modal
    function displayInforToModal(paramOrderObj) {
        "use strict";
        $("#input-fullname").val(paramOrderObj.hoVaTen);
        $("#input-phone").val(paramOrderObj.soDienThoai);
        $("#input-address").val(paramOrderObj.diaChi);
        $("#input-message").val(paramOrderObj.loiNhan);
        $("#input-voucher").val(paramOrderObj.voucher);
        $("#area-detail").val(
            "Xác nhận: " +
                paramOrderObj.hoVaTen +
                ", " +
                paramOrderObj.soDienThoai +
                ", " +
                paramOrderObj.diaChi +
                "\n" +
                "Menu: Combo " +
                paramOrderObj.menu.pizzaSize +
                ", Đường kính(cm) " +
                paramOrderObj.menu.duongKinh +
                ", Sườn(miếng) " +
                paramOrderObj.menu.suon +
                ", Salad(gr) " +
                paramOrderObj.menu.salad +
                ", Số lượng nước " +
                paramOrderObj.menu.drink +
                "\n" +
                "Loại pizza: " +
                paramOrderObj.loaiPizza +
                ", Giá: " +
                paramOrderObj.menu.priceVND +
                ", Mã giảm giá: " +
                paramOrderObj.voucher +
                ", Loại nước " +
                paramOrderObj.drink +
                "\n" +
                "Phải thanh toán " +
                paramOrderObj.actualPrice() +
                " VND " +
                " (Giảm giá " +
                paramOrderObj.discount +
                "%)"
        );
    }
    // Hàm đọc dữ liệu từ form order
    function readDataPizza(paramOrderObj) {
        "use strict";
        paramOrderObj.menu = gComboObj;
        paramOrderObj.loaiPizza = gPizzaType;
        paramOrderObj.voucher = $("#inp-voucher").val().trim();
        paramOrderObj.discount = 0;
        paramOrderObj.drink = $("#select-drink").val();
        paramOrderObj.hoVaTen = $("#inp-fullname").val().trim();
        paramOrderObj.email = $("#inp-email").val().trim();
        paramOrderObj.soDienThoai = $("#inp-dien-thoai").val().trim();
        paramOrderObj.diaChi = $("#inp-dia-chi").val().trim();
        paramOrderObj.loiNhan = $("#inp-message").val().trim();
    }
    // Hàm kiểm tra tất cả thông tin order pizza
    function validateDataPizza(paramOrderObj) {
        "use strict";
        if (paramOrderObj.menu == "") {
            alert("Bạn chưa chọn menu combo Pizza!");
            return false;
        }
        if (paramOrderObj.loaiPizza == "") {
            alert("Bạn chưa chọn loại Pizza!");
            return false;
        }
        if (paramOrderObj.drink == "all") {
            alert("Bạn chưa chọn loại nước uống!");
            return false;
        }
        if (paramOrderObj.hoVaTen == "") {
            alert("Bạn chưa nhập họ và tên!");
            return false;
        }
        if (validateEmail(paramOrderObj.email) == false) {
            return false;
        }
        if (validatePhone(paramOrderObj.soDienThoai) == false) {
            return false;
        }
        if (paramOrderObj.diaChi == "") {
            alert("Bạn chưa nhập địa chỉ");
            return false;
        }
        return true;
    }
    // Hàm kiểm tra email
    function validateEmail(paramEmail) {
        "use strict";
        var vMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (paramEmail == "") {
            alert("Bạn chưa nhập email");
            return false;
        }
        if (paramEmail.match(vMailFormat)) {
            return true;
        } else {
            alert("Sai cú pháp email, vui lòng kiểm tra lại!");
            $("#inp-email").focus();
            return false;
        }
    }
    //Hàm kiểm tra số điện thoại
    function validatePhone(paramPhone) {
        "use strict";
        if (paramPhone == "") {
            alert("Bạn chưa nhập số điện thoại");
            return false;
        }
        if (isNaN(paramPhone)) {
            alert("Số điện thoại phải là số");
            return false;
        }
        if (paramPhone.length != 10) {
            alert("Số điện thoại phải bao gồm 10 số");
            return false;
        }
        return true;
    }
    // Hàm gọi Api tạo đơn hàng
    function callApiCreateOrder(paramOrderObj) {
        "use strict";
        var vObjectRequest = {
            kichCo: paramOrderObj.menu.pizzaSize,
            duongKinh: paramOrderObj.menu.duongKinh,
            suon: paramOrderObj.menu.suon,
            salad: paramOrderObj.menu.salad,
            loaiPizza: paramOrderObj.loaiPizza,
            idVourcher: paramOrderObj.voucher,
            idLoaiNuocUong: paramOrderObj.drink,
            soLuongNuoc: paramOrderObj.menu.drink,
            hoTen: paramOrderObj.hoVaTen,
            thanhTien: paramOrderObj.menu.priceVND,
            email: paramOrderObj.email,
            soDienThoai: paramOrderObj.soDienThoai,
            diaChi: paramOrderObj.diaChi,
            loiNhan: paramOrderObj.loiNhan,
        };
        var vObjectJsonRequest = JSON.stringify(vObjectRequest);
        $.ajax({
            url: gORDER_URL,
            type: "POST",
            contentType: "application/json",
            data: vObjectJsonRequest,
            async: false,
            success: function (res) {
                console.log("Thông tin đơn hàng vừa tạo");
                console.log(res);
                alert("Gửi đơn hàng thành công");
                $("#order-modal").modal("hide");
                displayOrderCodeToModal(res); // hiển thị ordercode mới tạo lên modal
            },
            error: function (ajaxContext) {
                console.log(ajaxContext.responseText);
                alert("Tạo đơn hàng thất bại, vui lòng kiểm tra lại");
            },
        });
    }
    // Hàm hiển thị thông tin order code
    function displayOrderCodeToModal(paramResObj) {
        "use strict";
        $("#input-ordercode").val(paramResObj.orderCode);
        $("#ordercode-modal").modal("show");
    }
    // Hàm gọi Api lấy voucher giảm giá bằng mà giảm giá
    function callApiGetVoucherByVoucherCode(paramOrderObj) {
        "use strict";
        $.ajax({
            url: gVOUCHER_URL + paramOrderObj.voucher,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                console.log("Thông tin voucher:");
                console.log(res);
                paramOrderObj.discount = res.phanTramGiamGia;
            },
            error: function (ajaxContext) {
                console.log(
                    "Voucher không tồn tại, hãy thử với mã giảm giá khác"
                );
                paramOrderObj.discount = 0;
            },
        });
    }
    // Hàm gọi Api lấy danh sách đồ uống cho vào ô select
    function callApiGetAllDrink() {
        "use strict";
        $.ajax({
            url: gDRINK_URL,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                console.log("Đối tượng nước uống trả về: ");
                console.log(res);
                loadDrinkToSelect(res); // Gọi làm ghi dữ liệu nhận được vào ô select drink
            },
            error: function (ajaxContext) {
                console.log(
                    "Lấy dữ liệu nước uống thất bại " + ajaxContext.responseText
                );
            },
        });
    }
    // Hàm ghi dữ liệu nước uống nhận được vào ô select
    function loadDrinkToSelect(paramResObj) {
        "use strict";
        for (var bIndex = 0; bIndex < paramResObj.length; bIndex++) {
            $("#select-drink").append(
                $("<option>", {
                    value: paramResObj[bIndex].maNuocUong,
                    text: paramResObj[bIndex].tenNuocUong,
                })
            );
        }
    }
    // Hàm tạo đối tượng combo pizza khi nhấn nút
    function getPizza(
        paramPizzaSize,
        paramDuongKinh,
        paramSuon,
        paramSalad,
        paramDrink,
        paramPrice
    ) {
        "use strict";
        var vComboObj = {
            pizzaSize: paramPizzaSize,
            duongKinh: paramDuongKinh,
            suon: paramSuon,
            salad: paramSalad,
            drink: paramDrink,
            priceVND: paramPrice,
        };
        return vComboObj;
    }
    // Hàm tạo đối tượng combo pizza khi nhấn nút
    function getPizzaType(paramPizzaType) {
        "use strict";
        var vPizzaType = paramPizzaType;
        return vPizzaType;
    }
    // Hàm đổi màu nút nhấn khi nút được nhấn
    function changeColor(paramPizza) {
        "use strict";
        if (paramPizza == "Small") {
            $("#btn-small").attr("class", "btn btn-info w-100");
            $("#btn-medium").attr("class", "btn btn-warning w-100");
            $("#btn-large").attr("class", "btn btn-warning w-100");
        }
        if (paramPizza == "Medium") {
            $("#btn-small").attr("class", "btn btn-warning w-100");
            $("#btn-medium").attr("class", "btn btn-info w-100");
            $("#btn-large").attr("class", "btn btn-warning w-100");
        }
        if (paramPizza == "Large") {
            $("#btn-small").attr("class", "btn btn-warning w-100");
            $("#btn-medium").attr("class", "btn btn-warning w-100");
            $("#btn-large").attr("class", "btn btn-info w-100");
        }
        if (paramPizza == "Seafood") {
            $("#btn-seafood").attr("class", "btn btn-info w-100");
            $("#btn-hawaii").attr("class", "btn btn-warning w-100");
            $("#btn-bacon").attr("class", "btn btn-warning w-100");
        }
        if (paramPizza == "Hawaii") {
            $("#btn-seafood").attr("class", "btn btn-warning w-100");
            $("#btn-hawaii").attr("class", "btn btn-info w-100");
            $("#btn-bacon").attr("class", "btn btn-warning w-100");
        }
        if (paramPizza == "Bacon") {
            $("#btn-seafood").attr("class", "btn btn-warning w-100");
            $("#btn-hawaii").attr("class", "btn btn-warning w-100");
            $("#btn-bacon").attr("class", "btn btn-info w-100");
        }
    }
});
