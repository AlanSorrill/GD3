"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkgdsn3"] = self["webpackChunkgdsn3"] || []).push([["project1Bundle"],{

/***/ "./src/Helper.ts":
/*!***********************!*\
  !*** ./src/Helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Device = void 0;\nclass Device {\n    static isPhone() {\n        let check = false;\n        (function (a) { if (/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(a.substr(0, 4)))\n            check = true; })(navigator.userAgent || navigator.vendor || window['opera']);\n        return check;\n    }\n    ;\n    static isTabletOrPhone() {\n        let check = false;\n        (function (a) { if (/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(a.substr(0, 4)))\n            check = true; })(navigator.userAgent || navigator.vendor || window['opera']);\n        return check;\n    }\n    ;\n    static getType() {\n        if (this.isPhone()) {\n            return 'phone';\n        }\n        else if (this.isTabletOrPhone()) {\n            return 'tablet';\n        }\n        else {\n            return 'desktop';\n        }\n    }\n    static getOrientation() {\n        return (window.innerWidth < window.innerHeight) ? 'vertical' : 'horizontal';\n    }\n}\nexports.Device = Device;\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLE1BQU07SUFDZixNQUFNLENBQUMsT0FBTztRQUNWLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksMFRBQTBULENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLHlrREFBeWtELENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2Z0UsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUFBLENBQUM7SUFDRixNQUFNLENBQUMsZUFBZTtRQUNsQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLHFWQUFxVixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSx5a0RBQXlrRCxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbGlFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU87UUFDVixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNoQixPQUFPLE9BQU8sQ0FBQTtTQUNqQjthQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQy9CLE9BQU8sUUFBUSxDQUFBO1NBQ2xCO2FBQU07WUFDSCxPQUFPLFNBQVMsQ0FBQTtTQUNuQjtJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsY0FBYztRQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFBO0lBQy9FLENBQUM7Q0FDSjtBQXZCRCx3QkF1QkMifQ==//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvSGVscGVyLnRzLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCwyQ0FBMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHNuMy8uL3NyYy9IZWxwZXIudHM/Nzg5NCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGV2aWNlID0gdm9pZCAwO1xuY2xhc3MgRGV2aWNlIHtcbiAgICBzdGF0aWMgaXNQaG9uZSgpIHtcbiAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbiAoYSkgeyBpZiAoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7IH0pKG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3dbJ29wZXJhJ10pO1xuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuICAgIDtcbiAgICBzdGF0aWMgaXNUYWJsZXRPclBob25lKCkge1xuICAgICAgICBsZXQgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgKGZ1bmN0aW9uIChhKSB7IGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKSB8fCAvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsIDQpKSlcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTsgfSkobmF2aWdhdG9yLnVzZXJBZ2VudCB8fCBuYXZpZ2F0b3IudmVuZG9yIHx8IHdpbmRvd1snb3BlcmEnXSk7XG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG4gICAgO1xuICAgIHN0YXRpYyBnZXRUeXBlKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bob25lKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAncGhvbmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNUYWJsZXRPclBob25lKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAndGFibGV0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnZGVza3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGdldE9yaWVudGF0aW9uKCkge1xuICAgICAgICByZXR1cm4gKHdpbmRvdy5pbm5lcldpZHRoIDwgd2luZG93LmlubmVySGVpZ2h0KSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgfVxufVxuZXhwb3J0cy5EZXZpY2UgPSBEZXZpY2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lTR1ZzY0dWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMGhsYkhCbGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3UVVGRlFTeE5RVUZoTEUxQlFVMDdTVUZEWml4TlFVRk5MRU5CUVVNc1QwRkJUenRSUVVOV0xFbEJRVWtzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0UlFVTnNRaXhEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVsQlFVa3NNRlJCUVRCVUxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMSGxyUkVGQmVXdEVMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xbEJRVVVzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk1zUTBGQlF5eFRRVUZUTEVsQlFVa3NVMEZCVXl4RFFVRkRMRTFCUVUwc1NVRkJTU3hOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjJaMFVzVDBGQlR5eExRVUZMTEVOQlFVTTdTVUZEYWtJc1EwRkJRenRKUVVGQkxFTkJRVU03U1VGRFJpeE5RVUZOTEVOQlFVTXNaVUZCWlR0UlFVTnNRaXhKUVVGSkxFdEJRVXNzUjBGQlJ5eExRVUZMTEVOQlFVTTdVVUZEYkVJc1EwRkJReXhWUVVGVkxFTkJRVU1zU1VGQlNTeEpRVUZKTEhGV1FVRnhWaXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4NWEwUkJRWGxyUkN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVGRkxFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU1zVTBGQlV5eEpRVUZKTEZOQlFWTXNRMEZCUXl4TlFVRk5MRWxCUVVrc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYkdsRkxFOUJRVThzUzBGQlN5eERRVUZETzBsQlEycENMRU5CUVVNN1NVRkJRU3hEUVVGRE8wbEJRMFlzVFVGQlRTeERRVUZETEU5QlFVODdVVUZEVml4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJUdFpRVU5vUWl4UFFVRlBMRTlCUVU4c1EwRkJRVHRUUVVOcVFqdGhRVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMR1ZCUVdVc1JVRkJSU3hGUVVGRk8xbEJReTlDTEU5QlFVOHNVVUZCVVN4RFFVRkJPMU5CUTJ4Q08yRkJRVTA3V1VGRFNDeFBRVUZQTEZOQlFWTXNRMEZCUVR0VFFVTnVRanRKUVVOTUxFTkJRVU03U1VGRFJDeE5RVUZOTEVOQlFVTXNZMEZCWXp0UlFVTnFRaXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEZWQlFWVXNSMEZCUnl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1dVRkJXU3hEUVVGQk8wbEJReTlGTEVOQlFVTTdRMEZEU2p0QlFYWkNSQ3gzUWtGMVFrTWlmUT09Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Helper.ts\n");

/***/ }),

/***/ "./src/Project1/Project1Index.tsx":
/*!****************************************!*\
  !*** ./src/Project1/Project1Index.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nconst react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\"));\nconst StudentTradingCard_1 = __webpack_require__(/*! ./StudentTradingCard */ \"./src/Project1/StudentTradingCard.tsx\");\nlet mainContainer = document.getElementById('root');\nreact_dom_1.default.render(react_1.default.createElement(StudentTradingCard_1.Project1Root, null), mainContainer);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvamVjdDFJbmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm9qZWN0MS9Qcm9qZWN0MUluZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQiwwREFBZ0M7QUFDaEMsNkRBQW9EO0FBQ3BELElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbkQsbUJBQVEsQ0FBQyxNQUFNLENBQUMsOEJBQUMsaUNBQVksT0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUHJvamVjdDEvUHJvamVjdDFJbmRleC50c3guanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQ0FBZ0MsbUJBQU8sQ0FBQyw0Q0FBTztBQUMvQyxvQ0FBb0MsbUJBQU8sQ0FBQyxvREFBVztBQUN2RCw2QkFBNkIsbUJBQU8sQ0FBQyxtRUFBc0I7QUFDM0Q7QUFDQTtBQUNBLDJDQUEyQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dkc24zLy4vc3JjL1Byb2plY3QxL1Byb2plY3QxSW5kZXgudHN4PzNkMTMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IFN0dWRlbnRUcmFkaW5nQ2FyZF8xID0gcmVxdWlyZShcIi4vU3R1ZGVudFRyYWRpbmdDYXJkXCIpO1xubGV0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xucmVhY3RfZG9tXzEuZGVmYXVsdC5yZW5kZXIocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU3R1ZGVudFRyYWRpbmdDYXJkXzEuUHJvamVjdDFSb290LCBudWxsKSwgbWFpbkNvbnRhaW5lcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lVSEp2YW1WamRERkpibVJsZUM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTlRY205cVpXTjBNUzlRY205cVpXTjBNVWx1WkdWNExuUnplQ0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3T3p0QlFVRkJMR3RFUVVFd1FqdEJRVU14UWl3d1JFRkJaME03UVVGRGFFTXNOa1JCUVc5RU8wRkJRM0JFTEVsQlFVa3NZVUZCWVN4SFFVRkhMRkZCUVZFc1EwRkJReXhqUVVGakxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVRTdRVUZEYmtRc2JVSkJRVkVzUTBGQlF5eE5RVUZOTEVOQlFVTXNPRUpCUVVNc2FVTkJRVmtzVDBGQlJ5eEZRVUZGTEdGQlFXRXNRMEZCUXl4RFFVRkRJbjA9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Project1/Project1Index.tsx\n");

/***/ }),

/***/ "./src/Project1/StudentTradingCard.tsx":
/*!*********************************************!*\
  !*** ./src/Project1/StudentTradingCard.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.StudentTradingCard = exports.Project1Root = void 0;\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nconst Helper_1 = __webpack_require__(/*! ../Helper */ \"./src/Helper.ts\");\nclass Project1Root extends react_1.default.Component {\n    render() {\n        switch (Helper_1.Device.getType()) {\n            case 'phone':\n                return react_1.default.createElement(StudentTradingCard, null);\n            case 'tablet':\n            case 'desktop':\n                return react_1.default.createElement(\"div\", { style: { display: 'flex', height: '100%' } },\n                    react_1.default.createElement(\"div\", { style: { flexGrow: 1 } }),\n                    react_1.default.createElement(\"div\", { style: { flexGrow: 1 } },\n                        react_1.default.createElement(StudentTradingCard, null)),\n                    react_1.default.createElement(\"div\", { style: { flexGrow: 1 } }));\n        }\n    }\n}\nexports.Project1Root = Project1Root;\nclass StudentTradingCard extends react_1.default.Component {\n    constructor() {\n        super(...arguments);\n        this.overHang = 24;\n    }\n    render() {\n        return react_1.default.createElement(\"div\", { style: { backgroundColor: '#F05F5F', width: '100%', height: '100%', fontFamily: \"'Varela Round', sans-serif\", color: 'white' } },\n            react_1.default.createElement(\"div\", { style: { height: 250, width: '100%', position: 'relative', backgroundSize: 'cover', backgroundImage: \"url('project1/background.png')\" } },\n                react_1.default.createElement(\"div\", { style: { width: 256, height: 256, position: 'absolute', bottom: 0, left: '50%', transform: `translate(-50%, ${this.overHang}px)`, backgroundSize: '100%', backgroundImage: \"url('project1/alanSquare.jpg')\", borderRadius: 24 } })),\n            react_1.default.createElement(\"div\", { style: { fontSize: 36, textAlign: 'center', marginTop: this.overHang } }, \"Alan Sorrill\"));\n    }\n}\nexports.StudentTradingCard = StudentTradingCard;\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZGVudFRyYWRpbmdDYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1Byb2plY3QxL1N0dWRlbnRUcmFkaW5nQ2FyZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQXlCO0FBQ3pCLHNDQUFrQztBQUNsQyxNQUFhLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FBUztJQUM3QyxNQUFNO1FBQ0YsUUFBUSxlQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdEIsS0FBSyxPQUFPO2dCQUNSLE9BQU8sOEJBQUMsa0JBQWtCLE9BQUcsQ0FBQTtZQUNqQyxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssU0FBUztnQkFDVixPQUFPLHVDQUFLLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtvQkFDbEQsdUNBQUssS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFRO29CQUNuQyx1Q0FBSyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO3dCQUN2Qiw4QkFBQyxrQkFBa0IsT0FBRyxDQUNwQjtvQkFDTix1Q0FBSyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQVEsQ0FDakMsQ0FBQTtTQUNiO0lBQ0wsQ0FBQztDQUNKO0FBaEJELG9DQWdCQztBQUVELE1BQWEsa0JBQW1CLFNBQVEsZUFBSyxDQUFDLFNBQVM7SUFBdkQ7O1FBQ0ksYUFBUSxHQUFXLEVBQUUsQ0FBQztJQVcxQixDQUFDO0lBVkcsTUFBTTtRQUNGLE9BQU8sdUNBQUssS0FBSyxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLDRCQUE0QixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7WUFDdEksdUNBQUssS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0NBQWdDLEVBQUU7Z0JBQ3hJLHVDQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsbUJBQW1CLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0MsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLEdBRTlOLENBQ0o7WUFDTix1Q0FBSyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsbUJBQW9CLENBQzNGLENBQUE7SUFDVixDQUFDO0NBQ0o7QUFaRCxnREFZQyJ9//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUHJvamVjdDEvU3R1ZGVudFRyYWRpbmdDYXJkLnRzeC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDBCQUEwQixHQUFHLG9CQUFvQjtBQUNqRCxnQ0FBZ0MsbUJBQU8sQ0FBQyw0Q0FBTztBQUMvQyxpQkFBaUIsbUJBQU8sQ0FBQyxrQ0FBVztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxTQUFTLG1DQUFtQztBQUMxRywyREFBMkQsU0FBUyxlQUFlO0FBQ25GLDJEQUEyRCxTQUFTLGVBQWU7QUFDbkY7QUFDQSwyREFBMkQsU0FBUyxlQUFlO0FBQ25GO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsU0FBUyx1SEFBdUg7QUFDdEwsbURBQW1ELFNBQVMsZ0lBQWdJO0FBQzVMLHVEQUF1RCxTQUFTLHFHQUFxRyxjQUFjLHFHQUFxRztBQUN4UixtREFBbUQsU0FBUywrREFBK0Q7QUFDM0g7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwyQ0FBMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHNuMy8uL3NyYy9Qcm9qZWN0MS9TdHVkZW50VHJhZGluZ0NhcmQudHN4PzMzNDAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlN0dWRlbnRUcmFkaW5nQ2FyZCA9IGV4cG9ydHMuUHJvamVjdDFSb290ID0gdm9pZCAwO1xuY29uc3QgcmVhY3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xuY29uc3QgSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vSGVscGVyXCIpO1xuY2xhc3MgUHJvamVjdDFSb290IGV4dGVuZHMgcmVhY3RfMS5kZWZhdWx0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBzd2l0Y2ggKEhlbHBlcl8xLkRldmljZS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Bob25lJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoU3R1ZGVudFRyYWRpbmdDYXJkLCBudWxsKTtcbiAgICAgICAgICAgIGNhc2UgJ3RhYmxldCc6XG4gICAgICAgICAgICBjYXNlICdkZXNrdG9wJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogJzEwMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBmbGV4R3JvdzogMSB9IH0pLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IGZsZXhHcm93OiAxIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFN0dWRlbnRUcmFkaW5nQ2FyZCwgbnVsbCkpLFxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IGZsZXhHcm93OiAxIH0gfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Qcm9qZWN0MVJvb3QgPSBQcm9qZWN0MVJvb3Q7XG5jbGFzcyBTdHVkZW50VHJhZGluZ0NhcmQgZXh0ZW5kcyByZWFjdF8xLmRlZmF1bHQuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5vdmVySGFuZyA9IDI0O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJyNGMDVGNUYnLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgZm9udEZhbWlseTogXCInVmFyZWxhIFJvdW5kJywgc2Fucy1zZXJpZlwiLCBjb2xvcjogJ3doaXRlJyB9IH0sXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IGhlaWdodDogMjUwLCB3aWR0aDogJzEwMCUnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJywgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ3Byb2plY3QxL2JhY2tncm91bmQucG5nJylcIiB9IH0sXG4gICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyB3aWR0aDogMjU2LCBoZWlnaHQ6IDI1NiwgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogMCwgbGVmdDogJzUwJScsIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgtNTAlLCAke3RoaXMub3Zlckhhbmd9cHgpYCwgYmFja2dyb3VuZFNpemU6ICcxMDAlJywgYmFja2dyb3VuZEltYWdlOiBcInVybCgncHJvamVjdDEvYWxhblNxdWFyZS5qcGcnKVwiLCBib3JkZXJSYWRpdXM6IDI0IH0gfSkpLFxuICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBmb250U2l6ZTogMzYsIHRleHRBbGlnbjogJ2NlbnRlcicsIG1hcmdpblRvcDogdGhpcy5vdmVySGFuZyB9IH0sIFwiQWxhbiBTb3JyaWxsXCIpKTtcbiAgICB9XG59XG5leHBvcnRzLlN0dWRlbnRUcmFkaW5nQ2FyZCA9IFN0dWRlbnRUcmFkaW5nQ2FyZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVUzUjFaR1Z1ZEZSeVlXUnBibWREWVhKa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDFCeWIycGxZM1F4TDFOMGRXUmxiblJVY21Ga2FXNW5RMkZ5WkM1MGMzZ2lYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPenM3TzBGQlFVRXNhMFJCUVhsQ08wRkJRM3BDTEhORFFVRnJRenRCUVVOc1F5eE5RVUZoTEZsQlFXRXNVMEZCVVN4bFFVRkxMRU5CUVVNc1UwRkJVenRKUVVNM1F5eE5RVUZOTzFGQlEwWXNVVUZCVVN4bFFVRk5MRU5CUVVNc1QwRkJUeXhGUVVGRkxFVkJRVVU3V1VGRGRFSXNTMEZCU3l4UFFVRlBPMmRDUVVOU0xFOUJRVThzT0VKQlFVTXNhMEpCUVd0Q0xFOUJRVWNzUTBGQlFUdFpRVU5xUXl4TFFVRkxMRkZCUVZFc1EwRkJRenRaUVVOa0xFdEJRVXNzVTBGQlV6dG5Ra0ZEVml4UFFVRlBMSFZEUVVGTExFdEJRVXNzUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlJUdHZRa0ZEYkVRc2RVTkJRVXNzUzBGQlN5eEZRVUZGTEVWQlFVVXNVVUZCVVN4RlFVRkZMRU5CUVVNc1JVRkJSU3hIUVVGUk8yOUNRVU51UXl4MVEwRkJTeXhMUVVGTExFVkJRVVVzUlVGQlJTeFJRVUZSTEVWQlFVVXNRMEZCUXl4RlFVRkZPM2RDUVVOMlFpdzRRa0ZCUXl4clFrRkJhMElzVDBGQlJ5eERRVU53UWp0dlFrRkRUaXgxUTBGQlN5eExRVUZMTEVWQlFVVXNSVUZCUlN4UlFVRlJMRVZCUVVVc1EwRkJReXhGUVVGRkxFZEJRVkVzUTBGRGFrTXNRMEZCUVR0VFFVTmlPMGxCUTB3c1EwRkJRenREUVVOS08wRkJhRUpFTEc5RFFXZENRenRCUVVWRUxFMUJRV0VzYTBKQlFXMUNMRk5CUVZFc1pVRkJTeXhEUVVGRExGTkJRVk03U1VGQmRrUTdPMUZCUTBrc1lVRkJVU3hIUVVGWExFVkJRVVVzUTBGQlF6dEpRVmN4UWl4RFFVRkRPMGxCVmtjc1RVRkJUVHRSUVVOR0xFOUJRVThzZFVOQlFVc3NTMEZCU3l4RlFVRkZMRVZCUVVVc1pVRkJaU3hGUVVGRkxGTkJRVk1zUlVGQlJTeExRVUZMTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTFCUVUwc1JVRkJSU3hOUVVGTkxFVkJRVVVzVlVGQlZTeEZRVUZGTERSQ1FVRTBRaXhGUVVGRkxFdEJRVXNzUlVGQlJTeFBRVUZQTEVWQlFVVTdXVUZEZEVrc2RVTkJRVXNzUzBGQlN5eEZRVUZGTEVWQlFVVXNUVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeEZRVUZGTEZGQlFWRXNSVUZCUlN4VlFVRlZMRVZCUVVVc1kwRkJZeXhGUVVGRkxFOUJRVThzUlVGQlJTeGxRVUZsTEVWQlFVVXNaME5CUVdkRExFVkJRVVU3WjBKQlEzaEpMSFZEUVVGTExFdEJRVXNzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4SFFVRkhMRVZCUVVVc1RVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEV0QlFVc3NSVUZCUlN4VFFVRlRMRVZCUVVVc2JVSkJRVzFDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRXRCUVVzc1JVRkJSU3hqUVVGakxFVkJRVVVzVFVGQlRTeEZRVUZGTEdWQlFXVXNSVUZCUlN4blEwRkJaME1zUlVGQlJTeFpRVUZaTEVWQlFVVXNSVUZCUlN4RlFVRkZMRWRCUlRsT0xFTkJRMG83V1VGRFRpeDFRMEZCU3l4TFFVRkxMRVZCUVVVc1JVRkJReXhSUVVGUkxFVkJRVVVzUlVGQlJTeEZRVUZGTEZOQlFWTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1UwRkJVeXhGUVVGRkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVTXNiVUpCUVc5Q0xFTkJRek5HTEVOQlFVRTdTVUZEVml4RFFVRkRPME5CUTBvN1FVRmFSQ3huUkVGWlF5SjkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Project1/StudentTradingCard.tsx\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/Project1/Project1Index.tsx"));
/******/ }
]);