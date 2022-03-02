<template>
	<div id="slider" class="SliderChess">
		<div class="images">
			<div class="img-1">
				<img :src="getImagen1()" alt="" />
			</div>
			<div class="img-2">
				<img :src="getImagen2()" alt="" />
			</div>
		</div>
		<div class="slider">
			<div class="drag-line">
				<span>
					<img src="/images/pes_hand.gif" class="tab_hand" alt="" />
				</span>
			</div>
			<input type="range" name="range" min="0" max="100" value="-5" @mousemove="getPositionCursor" />
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				imagen1: '',
				imagen2: '',
				positionCursorOld: 0,
				positionCursorNow: 0
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.show = true;
				setTimeout(() => {
					window.bus.$emit('set-color', 'white');
				}, 500);
			});
			const slider = document.querySelector('.slider input');
			const img = document.querySelector('.images .img-2');
			const dragLine = document.querySelector('.drag-line');
			const draggable = document.querySelector('.drag-line > span');
			this.interactImage(dragLine, img, draggable, slider);
			window.bus.$emit('set-color', 'white');
			slider.oninput = (e) => {
				this.interactImage(dragLine, img, draggable, slider);
			};
		},
		methods: {
			getPositionCursor(event) {
				this.positionCursorOld = this.positionCursorNow;
				this.positionCursorNow = event.clientX;
			},
			getImagen1() {
				if (screen.width < 640) {
					window.bus.$emit('set-color', 'white');
					return '/images/blackmobile.svg';
				} else {
					return '/images/chessBlack.svg';
				}
			},
			getImagen2() {
				if (screen.width < 640) {
					return '/images/whitemobile.svg';
				} else {
					return '/images/chessWhite.svg';
				}
			},

			interactImage(dragLine, img, draggable, slider) {
				draggable.classList.add('ccc');

				let sliderVal = slider.value;
				let x = (dragLine.style.left = sliderVal + '%');
				let y = parseInt(x);
				img.style.width = sliderVal + '%';
				let logo = document.getElementsByClassName('Button Logo');
				let valueWidth;
				if (screen.width <= 640) {
					valueWidth = '90%';
					window.bus.$emit('set-color', 'white');
				} else {
					valueWidth = '95%';
				}
				if (y >= 95) {
					img.style.width = valueWidth;
					dragLine.style.left = valueWidth;
					window.bus.$emit('set-color', 'gray');

					logo[0].classList.add('is-black');
				} else if (y <= 5) {
					img.style.width = '5%';
					dragLine.style.left = '5%';
					window.bus.$emit('set-color', 'white');
					logo[0].classList.remove('is-black');
				} else {
					img.style.width = `${y}%`;
					dragLine.style.left = `${y}%`;
				}
				if (y > 19) {
					logo[0].classList.add('is-black');
				}
				if (this.positionCursorNow > this.positionCursorOld) {
					this.changeColorMenuBlack(y, true);
				} else if (y > 38) {
					this.changeColorMenuBlack(y, false);
				}
			},
			changeColorMenuBlack(y, isBlack) {
				this.changeMenuColor(document.getElementsByClassName('is-weare')[0].getBoundingClientRect(), 'is-weare', isBlack);
				this.changeMenuColor(document.getElementsByClassName('is-case')[0].getBoundingClientRect(), 'is-case', isBlack);
				this.changeMenuColor(document.getElementsByClassName('is-studios')[0].getBoundingClientRect(), 'is-studios', isBlack);
				this.changeMenuColor(document.getElementsByClassName('is-imaginarium')[0].getBoundingClientRect(), 'is-imaginarium', isBlack);
				this.changeMenuColor(document.getElementsByClassName('is-clients')[0].getBoundingClientRect(), 'is-clients', isBlack);
				this.changeMenuColor(document.getElementsByClassName('is-services')[0].getBoundingClientRect(), 'is-services', isBlack);
				this.changeMenuColor(document.getElementsByClassName('is-blog')[0].getBoundingClientRect(), 'is-blog', isBlack);
			},
			changeMenuColor(elementMenu, optionMenu, isBlack) {
				const img2 = document.getElementsByClassName('img-2');
				var img = img2[0].getBoundingClientRect();
				if (isBlack) {
					if (img.left < elementMenu.left + elementMenu.width && img.left + img.width > elementMenu.left) {
						this.classMenu(optionMenu, isBlack);
					}
				} else {
					if (img.width > elementMenu.right) {
						this.classMenu(optionMenu, true);
					} else {
						this.classMenu(optionMenu, false);
					}
				}
			},
			classMenu(idClass, isBlack) {
				let itemMenu = document.getElementsByClassName(idClass)[0];

				if (isBlack) {
					itemMenu.classList.add('is-gray-mobile');
					itemMenu.classList.remove('is-white-mobile');
					itemMenu.style = 'color: rgb(25, 25, 25);';
				} else {
					itemMenu.classList.remove('is-gray-mobile');
					itemMenu.classList.add('is-white-mobile');
					itemMenu.style = 'color: rgb(255, 255, 255);';
				}
			}
		}
	};
</script>
