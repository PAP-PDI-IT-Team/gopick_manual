(function (global) {
    'use strict';

    const IMAGE_SELECTOR = '.manual-image-card__img';

    class MetersScreenshotViewer {
        constructor() {
            this.dialog = null;
            this.dialogImage = null;
            this.dialogCaption = null;
            this.dialogCounter = null;
            this.previousButton = null;
            this.nextButton = null;
            this.galleryImages = [];
            this.currentIndex = 0;
            this.returnFocusElement = null;
        }

        createArrowButton(direction) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'screenshot-viewer__arrow screenshot-viewer__arrow--' + direction;
            button.setAttribute('aria-label', direction === 'previous' ? 'Previous screenshot' : 'Next screenshot');
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '2.5');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('aria-hidden', 'true');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', direction === 'previous' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6');
            icon.appendChild(path);
            button.appendChild(icon);
            button.addEventListener('click', () => this.step(direction === 'previous' ? -1 : 1));
            return button;
        }

        step(offset) {
            const count = this.galleryImages.length;
            this.showImage((this.currentIndex + offset + count) % count);
        }

        showImage(index) {
            const sourceImage = this.galleryImages[index];
            this.currentIndex = index;
            this.dialogImage.src = sourceImage.currentSrc || sourceImage.src;
            this.dialogImage.alt = sourceImage.alt;
            const card = sourceImage.closest('.manual-image-card');
            const caption = card ? card.querySelector('.manual-image-card__caption') : null;
            this.dialogCaption.textContent = caption ? caption.textContent : sourceImage.alt;
            const hasSeveral = this.galleryImages.length > 1;
            this.previousButton.hidden = !hasSeveral;
            this.nextButton.hidden = !hasSeveral;
            this.dialogCounter.hidden = !hasSeveral;
            this.dialogCounter.textContent = (index + 1) + ' / ' + this.galleryImages.length;
        }

        buildDialog() {
            const dialog = document.createElement('dialog');
            dialog.className = 'screenshot-viewer';
            dialog.setAttribute('aria-label', 'Enlarged screenshot');

            const figure = document.createElement('figure');
            figure.className = 'screenshot-viewer__figure';

            const image = document.createElement('img');
            image.className = 'screenshot-viewer__image';
            image.alt = '';

            const caption = document.createElement('figcaption');
            caption.className = 'screenshot-viewer__caption';
            const captionText = document.createElement('span');
            captionText.className = 'screenshot-viewer__caption-text';
            const counter = document.createElement('span');
            counter.className = 'screenshot-viewer__counter';
            caption.appendChild(captionText);
            caption.appendChild(counter);

            const stage = document.createElement('div');
            stage.className = 'screenshot-viewer__stage';
            stage.appendChild(image);
            this.previousButton = this.createArrowButton('previous');
            this.nextButton = this.createArrowButton('next');
            stage.appendChild(this.previousButton);
            stage.appendChild(this.nextButton);

            figure.appendChild(stage);
            figure.appendChild(caption);
            dialog.appendChild(figure);

            dialog.addEventListener('click', clickEvent => {
                if (clickEvent.target === dialog) dialog.close();
            });
            dialog.addEventListener('close', () => {
                if (this.returnFocusElement) this.returnFocusElement.focus();
            });

            document.body.appendChild(dialog);
            this.dialog = dialog;
            this.dialogImage = image;
            this.dialogCaption = captionText;
            this.dialogCounter = counter;
            dialog.addEventListener('keydown', keyEvent => {
                if (this.galleryImages.length < 2) return;
                if (keyEvent.key === 'ArrowLeft') this.step(-1);
                if (keyEvent.key === 'ArrowRight') this.step(1);
            });
        }

        open(sourceImage) {
            if (!this.dialog) this.buildDialog();
            this.returnFocusElement = sourceImage;
            const gallery = sourceImage.closest('.manual-image-gallery');
            this.galleryImages = gallery ? Array.from(gallery.querySelectorAll(IMAGE_SELECTOR)) : [sourceImage];
            this.showImage(this.galleryImages.indexOf(sourceImage));
            this.dialog.showModal();
        }

        makeImageEnlargeable(image) {
            if (image.dataset.enlargeable === 'true') return;
            image.dataset.enlargeable = 'true';
            image.tabIndex = 0;
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', 'Enlarge screenshot: ' + image.alt);
            image.classList.add('is-enlargeable');
        }

        bindTo(rootElement) {
            if (!rootElement) {
                throw new Error('Screenshot viewer requires a root element');
            }
            rootElement.querySelectorAll(IMAGE_SELECTOR).forEach(image => this.makeImageEnlargeable(image));

            rootElement.addEventListener('click', clickEvent => {
                const image = clickEvent.target.closest(IMAGE_SELECTOR);
                if (image && image.dataset.enlargeable === 'true') this.open(image);
            });
            rootElement.addEventListener('keydown', keyEvent => {
                const image = keyEvent.target.closest && keyEvent.target.closest(IMAGE_SELECTOR);
                if (!image || image.dataset.enlargeable !== 'true') return;
                if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                    keyEvent.preventDefault();
                    this.open(image);
                }
            });
        }
    }

    global.MetersScreenshotViewer = MetersScreenshotViewer;
})(window);
