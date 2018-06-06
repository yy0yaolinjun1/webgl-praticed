 
var canvas;
var gl;

var NumVertices  = 36;

var points = [];//将栈设为空
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

var vertices1 = [
         vec4( 0, -0.1,  0.1, 1.0 ),
         vec4( 0,  0.1,  0.1, 1.0 ),
         vec4( 0,  0.1,  0.1, 1.0 ),
         vec4( 0, -0.1,  0.1, 1.0 ),
         vec4( 0, -0.1, -0.1, 1.0 ),
         vec4( 0,  0.1, -0.1, 1.0 ),
         vec4( 0,  0.1, -0.1, 1.0 ),
         vec4( 0, -0.1, -0.1, 1.0 )
    ];
var vertices = [
        vec4( -0.1+0.4, -0.1+0.5,  0.1+0.6, 1.0 ),
        vec4( -0.1+0.4,  0.1+0.5,  0.1+0.6, 1.0 ),
        vec4(  0.1+0.4,  0.1+0.5,  0.1+0.6, 1.0 ),
        vec4(  0.1+0.4, -0.1+0.5,  0.1+0.6, 1.0 ),

        vec4( -0.1+0.4, -0.1+0.5, -0.1+0.6, 1.0 ),
        vec4( -0.1+0.4,  0.1+0.5, -0.1+0.6, 1.0 ),
        vec4(  0.1+0.4,  0.1+0.5, -0.1+0.6, 1.0 ),
        vec4(  0.1+0.4, -0.1+0.5, -0.1+0.6, 1.0 )
    ];//初始化正方体

var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];//初始化颜色
var ctm = mat4();
/*var R = mat4();

var d = vec3(4.0,5.0,6.0);
var thetaX =(180/Math.PI)*(Math.acos(3.0/Math.sqrt(14.0)));
var thetaY =(180/Math.PI)*(Math.acos(Math.sqrt(13/14)));*/
var x = 1;
var y = 2;
var z = 3;
var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
var vx = x/d;
var vy = y/d;
var vz = z/d;
var h = [Math.cos(angleToRadian(22.5)),vx*Math.sin(angleToRadian(22.5)),
    vy*Math.sin(angleToRadian(22.5)),vz*Math.sin(angleToRadian(22.5))];
var q = [Math.cos(angleToRadian(22.5)),-vx*Math.sin(angleToRadian(22.5)),
    -vy*Math.sin(angleToRadian(22.5)),-vz*Math.sin(angleToRadian(22.5))];
function init()
{



    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    document.getElementById( "xButton" ).onclick = function () {
        ctm = translate(-0.4,-0.5,-0.6);
        for(var n = 0;n<8;n++) {
            vertices[n] = mult(ctm,vertices[n]);
        }
        for(var a = 0 ;a < 8 ;a++)
        {
            for(var b = 1 ;b < 4 ;b++)
            {
                vertices1[a][b] = vertices[a][b-1];
            }
        }
        /*ctm = translate(-0.4,-0.5,-0.6);*/
    };
    document.getElementById( "yButton" ).onclick = function () {

        for(var n = 0;n<8;n++) {
            //vertices[n] = mult(h,vertices[n]);
            //vertices[n] = mult(vertices[n],q);
            //vertices[n] = mult(vertices[n],q);
            vertices1[n] = fourMult(h,vertices1[n]);
            vertices1[n] = fourMult(vertices1[n],q);
        }

        for(var a = 0 ;a < 8 ;a++)
        {
            for(var b = 1 ;b < 4 ;b++)
            {
                vertices[a][b-1] = vertices1[a][b];
            }
        }

        console.log(vertices);

       /* R = mult(R,rotateX(thetaX));
        R = mult(R,rotateY(thetaY));
        R = mult(R,rotateZ(-45.0));
        R = mult(R,rotateY(-thetaY));
        R = mult(R,rotateX(-thetaX));
*/

       // ctm = mult(ctm,R);
       // ctm = translate(0.4,0.5,0.6);

        /*for(var n = 0;n<8;n++) {
            vertices[n] = mult(R,vertices[n]);
        }
        console.log(vertices);*/
    };
    document.getElementById( "zButton" ).onclick = function () {
       /* ctm = translate(0.4,0.5,0.6);
        for(var n = 0;n<8;n++) {
            vertices[n] = mult(ctm,vertices[n]);
        }*/
        ctm = translate(0.4,0.5,0.6);
        for(var n = 0;n<8;n++) {
            vertices[n] = mult(ctm,vertices[n]);
        }
        //console.log(vertices1);
    };


    colorCube();//绘画
    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);



    render();
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d) 
{

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );//压点入栈
        //colors.push( vertexColors[indices[i]] );
    
        // for solid colored faces use 
        colors.push(vertexColors[a]);
        
    }
}
window.onload=init;
function render()
{
    //渲染
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");
    //清空栈
    points=[];
    colors=[];

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//document.writeln(vertices[0]);
    
    //alert(thetaLoc);
    //theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);
 
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame(init);//执行init函数
}

function fourMult(q,p){
    var n = [0,0,0,0];
    n[0] = (q[0] * p[0] - q[1] * p[1] - q[2] * p[2] - q[3] * p[3]);
    n[1] = (q[0] * p[1] + q[1] * p[0] + q[2] * p[3] - q[3] * p[2]);
    n[2] = (q[0] * p[2] - q[1] * p[3] + q[2] * p[0] + q[3] * p[1]);
    n[3] = (q[0] * p[3] + q[3] * p[0] - q[2] * p[1] + q[1] * p[2]);
    //console.log(q);
   // console.log(p);
    //console.log(n);
    return n;
}
function angleToRadian( angle ) {
    return ( Math.PI / 180 * angle ) ;
}

