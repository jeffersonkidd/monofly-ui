import { jsx as e } from "react/jsx-runtime";
//#region src/Button/Button.jsx
function t({ variant: t = "primary", children: n, ...r }) {
	return /* @__PURE__ */ e("button", {
		className: `jk-button jk-button--${t}`,
		...r,
		children: n
	});
}
//#endregion
export { t as Button };
