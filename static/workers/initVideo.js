self.onmessage = initVideo();

async function initVideo() {
  function waitForGlobalObject(objectName, objectNextName) {
    return new Promise((resolve) => {
      function check() {
        if (
          window[objectName] !== undefined &&
          (objectNextName === undefined ||
            window[objectName][objectNextName] !== undefined)
        ) {
          resolve();
        } else {
          setTimeout(check, 200);
        }
      }

      check();
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        console.log('Failed to load script', src);
        reject();
      };
      script.src = src;
      document.head.appendChild(script);
    });
  }

  function loadStyle(src) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.onload = () => {
        resolve();
      };
      link.onerror = () => {
        console.log('Failed to load CSS', src);
        reject();
      };
      link.href = src;
      document.head.appendChild(link);
    });
  }

  await waitForGlobalObject('p2pml', 'core');
  await waitForGlobalObject('p2pml', 'hlsjs');
  const isP2PSupported = p2pml.core.HybridLoader.isSupported();

  const engine = isP2PSupported
    ? new p2pml.hlsjs.Engine({
        loader: {
          useP2P: get(useP2P),
          trackerAnnounce: [
            'wss://tracker.novage.com.ua',
            'wss://tracker.openwebtorrent.com',
            'wss://noagendatube.com/tracker/socket',
          ],
        },
      })
    : undefined;
  const scriptPromise = await (async () => {
    await loadScript('/video/video.js');
    await Promise.all([
      loadScript('/video/hls.js'),
      loadScript('/video/components/videojs-contrib-quality-levels.js'),
      loadScript('/video/components/quality-select.js'),
      loadScript('/video/components/topbar.js'),
      loadScript('/video/components/title-overlay.js'),
      loadScript('/video/components/subtitle-overlay.js'),
      loadScript('/video/components/progressBar.js'),
      loadScript('/video/components/touch-overlay.js'),
    ]);
  })();

  loadStyle('/video/videojs.css');
  loadStyle('/video/video-cc.css');

  await scriptPromise;

  if (isP2PSupported) {
    p2pml.hlsjs.initVideoJsHlsJsPlugin();
    options.html5 = {
      hlsjsConfig: {
        liveSyncDurationCount: 7,
        loader: isP2PSupported
          ? engine.createLoaderClass()
          : Hls.DefaultConfig.loader,
      },
    };

    // engine.on('peer_connect', (peer) =>
    //   console.log('peer_connect', peer.id, peer.remoteAddress)
    // );
    // engine.on('peer_close', (peerId) => console.log('peer_close', peerId));
    // engine.on('piece_bytes_downloaded', (method, bytes, peerId) =>
    //   console.log('download', bytes)
    // );
    // engine.on('segment_loaded', (segment, peerId) =>
    //   console.log(
    //     'segment_loaded from',
    //     peerId ? `peer ${peerId}` : 'HTTP',
    //     segment.url
    //   )
    // );
  }

  postMessage('video ready');
}
