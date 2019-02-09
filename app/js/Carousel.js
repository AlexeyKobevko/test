class Carousel {
    constructor () {
        this.openedImageEl = $('.slide').first();
    }

    _isLastEl() {
        if ($('.img-hide').length === $('.slide').length) {
            return true;
        }
    }

    _getFirstEl() {
        if (this._isLastEl()) {
            this.openedImageEl = $('.slide').first().removeClass('img-hide');
        }
    }
    _getLastEl() {
        if (this._isLastEl()) {
            this.openedImageEl = $('.slide').last().removeClass('img-hide');
        }
    }

    getNextImage() {
        this.openedImageEl.addClass('img-hide');
        this.openedImageEl = this.openedImageEl.next('.slide').removeClass('img-hide');
        this._getFirstEl();
    }
    getPrevImage() {
        this.openedImageEl.addClass('img-hide');
        this.openedImageEl = this.openedImageEl.prev('.slide').removeClass('img-hide');
        this._getLastEl();
    }
}