$.fn.simpleAudioPlayer = function (t) {
    if ((window.navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && (console.log("SimpleAudioPlayer doesn't support this browser."), 1)) return !1;

    function i(t) {
        this.controller = t.controller, this.definition = t.definition
    }

    function e(t) {
        t = t || {}, this.phase = 0, this.run = !1, this.cache = {}, this.container = t.container, this.width = window.getComputedStyle(this.container).width.replace("px", ""), this.height = window.getComputedStyle(this.container).height.replace("px", ""), this.ratio = window.devicePixelRatio || 1, this.cache.width = this.ratio * this.width, this.cache.height = this.ratio * this.height, this.cache.height2 = this.cache.height / 2, this.cache.width2 = this.cache.width / 2, this.cache.width4 = this.cache.width / 4, this.cache.heightMax = this.cache.height2 - 4, this.amplitude = t.amplitude, this.speed = .05, this.frequency = 5, this.color = [26, 161, 178], this.speedInterpolationSpeed = .005, this.amplitudeInterpolationSpeed = .05, this.cache.interpolation = {
            speed: this.speed,
            amplitude: this.amplitude
        }, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = this.cache.width, this.canvas.height = this.cache.height, this.canvas.style.width = this.canvas.style.height = "100%", this.curves = [];
        for (var e = 0; e < i.prototype.definition.length; e++) this.curves.push(new i({
            controller: this,
            definition: i.prototype.definition[e]
        }));
        this.container.appendChild(this.canvas), this.start()
    }

    var n, o, a;
    i.prototype._globAttenuationEquation = function (t) {
        return null == i.prototype._globAttenuationEquation.cache[t] && (i.prototype._globAttenuationEquation.cache[t] = Math.pow(4 / (4 + Math.pow(t, 4)), 4)), i.prototype._globAttenuationEquation.cache[t]
    }, i.prototype._globAttenuationEquation.cache = {}, i.prototype._xpos = function (t) {
        return this.controller.cache.width2 + t * this.controller.cache.width4
    }, i.prototype._ypos = function (t) {
        var i = this.controller.cache.heightMax * this.controller.amplitude / this.definition.attenuation;
        return this.controller.cache.height2 + this._globAttenuationEquation(t) * i * Math.sin(this.controller.frequency * t - this.controller.phase)
    }, i.prototype.draw = function () {
        var t = this.controller.ctx;
        t.moveTo(0, 0), t.beginPath(), t.strokeStyle = "rgba(" + this.controller.color + "," + this.definition.opacity + ")", t.lineWidth = this.definition.lineWidth;
        for (var i = -2; i <= 2; i += .01) {
            var e = this._ypos(i);
            Math.abs(i) >= 1.9 && (e = this.controller.cache.height2), t.lineTo(this._xpos(i), e)
        }
        t.stroke()
    }, i.prototype.definition = [{attenuation: -2, lineWidth: .4, opacity: .1}, {
        attenuation: -6,
        lineWidth: .4,
        opacity: .2
    }, {attenuation: 6, lineWidth: .4, opacity: .4}, {attenuation: 2, lineWidth: .4, opacity: .6}, {
        attenuation: 1,
        lineWidth: .6,
        opacity: 1
    }], e.prototype._interpolate = function (t) {
        increment = this[t + "InterpolationSpeed"], Math.abs(this.cache.interpolation[t] - this[t]) <= increment ? this[t] = this.cache.interpolation[t] : this.cache.interpolation[t] > this[t] ? this[t] += increment : this[t] -= increment
    }, e.prototype._clear = function () {
        this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillRect(0, 0, this.cache.width, this.cache.height), this.ctx.globalCompositeOperation = "source-over"
    }, e.prototype._draw = function () {
        for (var t = 0, i = this.curves.length; t < i; t++) this.curves[t].draw()
    }, e.prototype._startDrawCycle = function () {
        !1 !== this.run && (this._clear(), this._interpolate("amplitude"), this._interpolate("speed"), this._draw(), this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI), window.requestAnimationFrame ? window.requestAnimationFrame(this._startDrawCycle.bind(this)) : setTimeout(this._startDrawCycle.bind(this), 20))
    }, e.prototype.start = function () {
        this.phase = 0, this.run = !0, this._startDrawCycle()
    }, e.prototype.setAmplitude = function (t) {
        this.cache.interpolation.amplitude = Math.max(Math.min(t, 1), 0)
    }, window.SiriWave = e, function () {
        var t = function () {
            this.audioAdapter = t._getAdapter(this), this.events = {}, this.sections = [], this.bind("update", i)
        };

        function i() {
            for (var t in this.sections) this.sections[t].condition() && this.sections[t].callback.call(this)
        }

        t.version = "0.3.2", t.adapters = {}, t.prototype = {
            load: function (i) {
                return i instanceof HTMLElement ? this.source = i : (this.source = window.Audio ? new Audio : {}, this.source.src = t._makeSupportedPath(i.src, i.codecs)), this.audio = this.audioAdapter.load(this.source), this
            }, play: function () {
                return this.audioAdapter.play(), this
            }, pause: function () {
                return this.audioAdapter.pause(), this
            }, bind: function (t, i) {
                return this.events[t] || (this.events[t] = []), this.events[t].push(i), this
            }, unbind: function (t) {
                return this.events[t] && delete this.events[t], this
            }, getWaveform: function () {
                return this.audioAdapter.getWaveform()
            }
        }, window.Dancer = t
    }(), n = window.Dancer, o = {
        mp3: "audio/mpeg;",
        ogg: 'audio/ogg; codecs="vorbis"',
        wav: 'audio/wav; codecs="1"',
        aac: 'audio/mp4; codecs="mp4a.40.2"'
    }, a = document.createElement("audio"), n.options = {}, n.setOptions = function (t) {
        for (var i in t) t.hasOwnProperty(i) && (n.options[i] = t[i])
    }, n.isSupported = function () {
        return window.Float32Array && window.Uint32Array ? (t = !!(navigator.vendor || "").match(/Apple/), i = (i = navigator.userAgent.match(/Version\/([^ ]*)/)) ? parseFloat(i[1]) : 0, t && i <= 6 || !window.AudioContext && !window.webkitAudioContext ? (console.log("not supported"), "") : "webaudio") : null;
        var t, i
    }, n.canPlay = function (t) {
        return a.canPlayType, !(!a.canPlayType || !a.canPlayType(o[t.toLowerCase()]).replace(/no/, ""))
    }, n.addPlugin = function (t, i) {
        void 0 === n.prototype[t] && (n.prototype[t] = i)
    }, n._makeSupportedPath = function (t, i) {
        if (!i) return t;
        for (var e = 0; e < i.length; e++) if (n.canPlay(i[e])) return t + "." + i[e];
        return t
    }, n._getAdapter = function (t) {
        switch (n.isSupported()) {
            case"webaudio":
                return new n.adapters.webaudio(t);
            default:
                return null
        }
    }, n._getMP3SrcFromAudio = function (t) {
        var i = t.children;
        if (t.src) return t.src;
        for (var e = i.length; e--;) if ((i[e].type || "").match(/audio\/mpeg/)) return i[e].src;
        return null
    }, function () {
        var t = 2048, i = function (t) {
            this.dancer = t, this.audio = new Audio, this.context = window.AudioContext ? new window.AudioContext : new window.webkitAudioContext
        };

        function e() {
            void 0 === this.source && (this.source = this.context.createMediaElementSource(this.audio)), this.source.connect(this.proc), this.source.connect(this.gain), this.gain.connect(this.context.destination), this.proc.connect(this.context.destination), this.isLoaded = !0, this.progress = 1
        }

        i.prototype = {
            load: function (i) {
                var n = this;
                return this.audio = i, this.isLoaded = !1, this.progress = 0, this.context.createScriptProcessor || (this.context.createScriptProcessor = this.context.createJavascriptNode), this.proc = this.context.createScriptProcessor(t / 2, 1, 1), this.proc.onaudioprocess = function (t) {
                    n.update.call(n, t)
                }, this.context.createGain || (this.context.createGain = this.context.createGainNode), this.gain = this.context.createGain(), this.signal = new Float32Array(t / 2), this.audio.readyState < 3 ? this.audio.addEventListener("canplay", function () {
                    e.call(n)
                }) : e.call(n), this.audio.addEventListener("progress", function (t) {
                    t.currentTarget.duration && (n.progress = t.currentTarget.seekable.end(0) / t.currentTarget.duration)
                }), this.audio
            }, play: function () {
                this.audio.play(), this.isPlaying = !0
            }, pause: function () {
                this.audio.pause(), this.isPlaying = !1
            }, setVolume: function (t) {
                this.gain.gain.value = t
            }, getVolume: function () {
                return this.gain.gain.value
            }, getProgress: function () {
                return this.progress
            }, getWaveform: function () {
                return this.signal
            }, getSpectrum: function () {
                return this.fft.spectrum
            }, getTime: function () {
                return this.audio.currentTime
            }, update: function (i) {
                if (this.isPlaying && this.isLoaded) {
                    var e, n = [], o = i.inputBuffer.numberOfChannels, a = t / o, s = function (t, i) {
                        return t[e] + i[e]
                    };
                    for (e = o; e--;) n.push(i.inputBuffer.getChannelData(e));
                    for (e = 0; e < a; e++) this.signal[e] = o > 1 ? n.reduce(s) / o : n[0][e]
                }
            }
        }, Dancer.adapters.webaudio = i
    }();
    var s = this, r = $.extend({chapters: [], fadeOutSpeed: 3}, t), c = {
        player: ".simpleAudioPlayer",
        progressBar: ".progressBar",
        progressBarInner: ".progressBarInner",
        progressIndicator: ".progressIndicator",
        progressTime: ".progressTime",
        durationTime: ".durationTime",
        waves: ".waves",
        play: ".play",
        pause: ".pause",
        stop: ".stop",
        forward: ".forward",
        backward: ".backward",
        menuToggle: ".menuToggle",
        chapterList: ".chapterList",
        chapterLink: ".chapterLink"
    };
    return this.each(function (t, i) {
        var n = $(this), o = $(c.player).length;
        if ("audio" != n.prop("tagName").toLowerCase()) return !1;
        r.title = r.title || n.data("title") || "Simple Audio Player";
        var a = void 0 === a && n.attr("src");
        if (!a) return !1;
        var h = new Audio(a), u = new Dancer;
        u.load(h);
        var d = u.getWaveform(), p = null,
            l = '<div class="' + c.player.substr(1) + '"><div class="containerTop cf"><div class="' + c.progressBar.substr(1) + '"><div class="' + c.progressBarInner.substr(1) + '"></div><div class="' + c.progressIndicator.substr(1) + '"></div></div><div class="trackInfo cf"><div class="' + c.progressTime.substr(1) + '">&nbsp;</div><div class="trackTitle">' + r.title + '</div><div class="' + c.durationTime.substr(1) + '">&nbsp;</div></div><div id="waves' + o + '" class="' + c.waves.substr(1) + '"></div><div class="controls row"><div class="col c2 ' + c.menuToggle.substr(1) + '">&nbsp;</div><div class="col c2 ' + c.backward.substr(1) + '"><span class="icon icon-backward"></span></div><div class="col c4 ' + c.play.substr(1) + '"><span class="icon icon-play"></span></div><div class="col c4 hide ' + c.pause.substr(1) + '"><span class="icon icon-pause"></span></div><div class="col c2 ' + c.forward.substr(1) + '"><span class="icon icon-forward"></span></div><div class="col c2 ' + c.stop.substr(1) + '"><span class="icon icon-stop"></span></div></div></div><div class="containerBottom cf"><div class="' + c.chapterList.substr(1) + '"></div></div></div>',
            f = $(l).insertAfter(n);
        n.css({width: 0, height: 0, visibility: "hidden"});
        var v = new e({container: document.getElementById("waves" + o), amplitude: 0});

        function g(t) {
            return f.find(c[t])
        }

        if (r.chapters.length > 0) {
            $(c.player).addClass("hasChapters"), g("menuToggle").append('<span class="icon icon-menu"></span>');
            for (var m = "<ul>", w = 0; w < r.chapters.length; w++) m += '<li><a class="' + c.chapterLink.substr(1) + '" data-chapter="' + r.chapters[w].seconds + '">' + r.chapters[w].title + "</a></li>";
            m += "</ul>", g("chapterList").append(m)
        }

        function y() {
            u.play(), p = setInterval(x, 100), P(), $(c.player).trigger({type: "sapPlay", hash: o})
        }

        function b() {
            u.pause(), _(), P()
        }

        function T() {
            M(15)
        }

        function A() {
            M(-15)
        }

        function x() {
            var t = 100 * Math.abs(function (t) {
                for (var i = 0, e = 0; e < t.length; e++) i += t[e];
                return i / t.length
            }(d));
            v.setAmplitude(t)
        }

        function k() {
            var t, i, e, n, o, a, s, r, c;
            t = u.audio.duration - u.audio.currentTime, i = Math.round(Math.floor(t / 60)), e = Math.round(t - 60 * i), n = ("0" + i).slice(-2) + ":" + ("0" + e).slice(-2), o = u.audio.currentTime, a = Math.round(Math.floor(o / 60)), s = Math.round(o - 60 * a), r = ("0" + a).slice(-2) + ":" + ("0" + s).slice(-2), g("progressTime").html(r), g("durationTime").html("- " + n), c = u.audio.currentTime / u.audio.duration * 100, $(g("progressBarInner")).css("width", c + "%")
        }

        function P() {
            g("play").toggleClass("hide"), g("pause").toggleClass("hide")
        }

        function C() {
            u.pause(), u.audio.currentTime = 0, u.audio.volume = 1, _(), g("play").removeClass("hide"), g("pause").addClass("hide"), k()
        }

        function _() {
            clearInterval(p), v.setAmplitude(0)
        }

        function S(t) {
            var i = (t = void 0 !== t ? t : r.fadeOutSpeed) / 1e3;
            u.audio.volume > .001 ? (u.audio.volume -= .001, setTimeout(S, i)) : C()
        }

        function M(t) {
            var i, e, n;
            (e = (i = t) > 0 && u.audio.currentTime < u.audio.duration - i, n = i < 0 && u.audio.currentTime + i > 0, e || n) && (u.audio.currentTime += t, k())
        }

        function I(t) {
            u.audio.currentTime = t, k()
        }

        s.jumpBy = function (t) {
            M(t)
        }, s.jumpTo = function (t) {
            I(t)
        }, s.fadeOut = function (t) {
            S(t)
        }, s.fadeOutAfterSeconds = function (t, i) {
            var e;
            e = void 0 !== (e = i) ? 1e3 * e : 0, setTimeout(S, e, t)
        }, s.fadeOutAfterChapter = function (t, i) {
            !function (t, i) {
                i = void 0 !== i ? i : 1;
                var e = 1e3 * r.chapters[i - 1];
                setTimeout(S, e, t)
            }(t, i)
        }, s.fadeOutAfterPercent = function (t, i) {
            var e, n;
            e = t, n = void 0 !== (n = i) ? n : 30, setTimeout(S, u.duration * (n / 100), e)
        }, g("progressBar").on("click", function (t) {
            I((t.pageX - $(this).offset().left) / $(this).innerWidth() * u.audio.duration)
        }), g("play").on("click", y), g("pause").on("click", b), g("menuToggle").on("click", function () {
            g("chapterList").slideToggle()
        }), g("stop").on("click", function () {
            C()
        }), g("forward").on("click", T), g("backward").on("click", A), g("chapterLink").on("click", function () {
            I($(this).data("chapter"))
        }), g("progressBar").on("mouseenter", function () {
            this.iid = setInterval(function () {
                g("progressBar").on("mousemove", function (t) {
                    var i = t.pageX - $(this).offset().left, e = i / $(this).innerWidth() * 100;
                    g("progressIndicator").css("left", e + "%")
                })
            }, 10)
        }).on("mouseleave", function () {
            this.iid && clearInterval(this.iid)
        }), $(window).keydown(function (t) {
            switch (t.keyCode) {
                case 32:
                    u.audio.paused ? y() : b();
                    break;
                case 37:
                    A();
                    break;
                case 39:
                    T()
            }
        }), f.on("sapPlay", function (t) {
            t.hash != o && (u.audio.paused || b())
        }), setInterval(function () {
            u.audio.paused ? u.audio.currentTime == u.audio.duration && C() : k()
        }, 100), setTimeout(k, 200)
    })
};