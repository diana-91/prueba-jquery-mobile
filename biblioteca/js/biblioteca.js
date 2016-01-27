function creaBDBiblio(){
    Mibiblio = openDatabase("BdBiblio2","1.0","Mibiblioteca",2*1024);
    //Para segurarme que la conexion es correcta
    //function onDeviceReady(){
        if(Mibiblio!=null){
            alert("La biblioteca se ha creado correctamente");
            Mibiblio.transaction(crearLibros,errorCrearLibros);
        }else{
            alert("La biblioteca no ha sido creada");
        }
    //}
}

function crearLibros(txt){
    txt.executeSql("CREATE TABLE IF NOT EXISTS Libros (isbn INTEGER PRIMARY KEY AUTOINCREMENT, autor TEXT NOT NULL, titulo TEXT NOT NULL, resumen TEXT)");
}

function errorCrearLibros(err){
    alert("Error al ejecutar la sentencia de crear libro"+err.code);
}

function ejecutaTransacion(numero){
    switch(numero){
            case 1: Mibiblio.transaction(guardaLibro,errorCrearLibros);
            break;
            case 2: Mibiblio.transaction(listarLibro,errorCrearLibros);
            break;
            case 3: Mibiblio.transaction(borrarLibro,errorCrearLibros);
            break;
    }
}

function guardaLibro(txt){
    var Mititulo =$("#titulo").val();
    var Miautor =$("#autor").val();
    var Miresumen =$("#resumen").val();
    txt.executeSql("INSERT INTO Libros(autor,titulo,resumen) values(?,?,?)"[Miautor,Mititulo,Miresumen]);
    alert("Se ha guardado el libro");
}

function listarLibro(txt){
    txt.executeSql("Select autor,titulo,resumen from Libros",[],function(txt,resultado){
                   var nlibros = resultado.rows.length;
                    $("#listaLibros").listview();
                    for(var i=0; i<nlibros; i++){
                        var libro=resultado.rows.item(i);
                        $("#listaLibros").append("<li> <a> <p>"+ libro["titulo"] +"</p> <br> <label>"+ libro["autor"] +"</label> </a> </li>");
                    }
                    $("#listaLibros").listview("refresh");
                   });
}

$(document).ready(function(){
    creaBDBiblio();
    $("#guardarlibro").click(function(){
        ejecutaTransacion(1);
    });
    $("#listar").click(function(){
        ejecutaTransacion(2);
    });
});