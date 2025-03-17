export interface ClipperProps {
	// value: boolean,
	customStyle ?: string,
	zIndex ?: number,
	imageUrl ?: string,
	fileType : string,
	quality : number,
	width : number,
	height : number,
	minWidth : number,
	maxWidth : number,
	destWidth ?: number,
	destHeight ?: number,
	minHeight : number,
	maxHeight : number,
	isLockWidth : boolean,
	isLockHeight : boolean,
	isLockRatio : boolean,
	scaleRatio : number,
	minRatio : number,
	maxRatio : number,
	isDisableScale : boolean,
	isDisableRotate : boolean,
	isLimitMove : boolean,
	isShowPhotoBtn : boolean,
	isShowRotateBtn : boolean,
	isShowConfirmBtn : boolean,
	isShowCancelBtn : boolean,
	rotateAngle : number,
	source : any,
	confirmBgColor?:string
	canvasId?:string
	// source ?: UTSJSONObject
}

export type ClipperclipStart = {
	height : number,
	width : number,
	corner : number,
	x : number,
	y : number,
	clipY : number,
	clipX : number,
}
export type Point = {
	x : number,
	y : number
}
export type ClipperState = {
	canvasWidth : number
	canvasHeight : number
	clipX : number
	clipY : number
	clipWidth : number
	clipHeight : number
	animation : boolean
	imageWidth : number
	imageHeight : number
	imageTop : number
	imageLeft : number
	scale : number
	angle : number
	image ?: string,
	imageInit : boolean
	// throttleTimer : number,
	// throttleFlag : boolean,
	// timeClipCenter : number,
	// flagClipTouch : boolean
	// flagEndTouch : boolean
	// clipStart : ClipperclipStart,
	// animationTimer : number
	// touchRelative : Point[],
}

export type ClipBoxSizes = {
	width : number;
	height : number;
	minWidth : number;
	minHeight : number;
	maxWidth : number;
	maxHeight : number;
}

export type Rectangle = {
	x: number,
	y: number,
	width : number;
	height : number;
}