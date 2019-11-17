console.log(console)
console.log(typeof console)
if (typeof console !== 'undefined') {
    (function(original) {
        console.log = function(node) {
            original(node)
            original.call(this, node);
        }
    })(console.log);
    // 以下 insertBefore などにも適用
}
console.log(222)
// if (typeof Element !== "undefined") {
//     (function(original) {
//         Element.prototype.appendChild = function(node) {
//             original.call(this, node);
//             console.log("appendChild(" + node + "): fire dom change event in here.");
//         }
//     })(Element.prototype.appendChild);
//     // 以下 insertBefore などにも適用
// }
// let bt = document.createElement("button")
// bt.textContent = 123
// document.body.appendChild(bt)