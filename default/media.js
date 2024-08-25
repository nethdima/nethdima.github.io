document.addEventListener("DOMContentLoaded", function () {
  const players = [
    {
      id: "nethdima-tv",
      playlist: [
        {
          src: "https://nethdima.lk/nethdima-tv-stream.m3u8",
          type: "application/x-mpegURL",
        },
        {
          src: "https://stream.zeno.fm/eownpnzhffvtv",
          type: "video/mp4",
        },
      ],
      currentPlaylistIndex: 0,
      poster: "https://i.ibb.co/WHnwWqs/ezgif-3-e11dd90953.gif",
      posterPlaying: "",
      isPlaying: false,
    },
  ];

  const schedules = {
    "nethdima-tv": [
      {
        start: new Date("2024-07-02T06:00:00"),
        end: new Date("2055-12-02T11:00:00"),
        posterPlaying: "https://i.ibb.co/WHnwWqs/ezgif-3-e11dd90953.gif",
      },
      {
        start: new Date("2024-07-02T11:00:00"),
        end: new Date("2024-07-03T06:00:00"),
        posterPlaying:
          "https://th.bing.com/th/id/R.b3f920ab8a8be885c72cb52c2290116b?rik=Bi%2fZZCx8mhDrkw&pid=ImgRaw&r=0",
      },
    ],
  };

  function updatePosterPlayingBasedOnDateTime() {
    const currentDate = new Date();

    players.forEach((tv) => {
      const schedule = schedules[tv.id];
      if (!schedule) {
        console.error(`No schedule found for ${tv.id}`);
        return;
      }

      const foundSchedule = schedule.find(
        (entry) => currentDate >= entry.start && currentDate < entry.end
      );
      if (!foundSchedule) {
        tv.posterPlaying = tv.poster;
      } else {
        tv.posterPlaying = foundSchedule.posterPlaying;
      }
    });
  }

  players.forEach((playerObj) => {
    const player = videojs(playerObj.id, {
      controls: true,
      preload: "auto",
      poster: playerObj.poster,
      controlBar: {
        volumePanel: false,
        progressControl: false,
      },
    });

    player.ready(() => {
      player.src(playerObj.playlist[playerObj.currentPlaylistIndex]);

      function togglePoster() {
        if (playerObj.isPlaying) {
          player.poster(playerObj.posterPlaying);
        } else {
          player.poster(playerObj.poster);
        }
      }

      player.on("play", function () {
        players.forEach(function (otherPlayerObj) {
          if (otherPlayerObj.id !== playerObj.id) {
            var otherPlayer = videojs(otherPlayerObj.id);
            if (otherPlayer) {
              otherPlayer.pause();
              otherPlayer.poster(otherPlayerObj.poster);
              otherPlayerObj.isPlaying = false;
            }
          }
        });

        playerObj.isPlaying = true;
        togglePoster();
      });

      player.on("pause", function () {
        playerObj.isPlaying = false;
        player.poster("");
      });

      player.on("waiting", function () {
        player.poster("");
      });

      player.on("canplay", function () {
        togglePoster();
      });

      player.on("ended", function () {
        playerObj.isPlaying = false;
        player.poster("");
      });

      player.on("error", () => {
        // Log a custom error message for live streaming errors
        console.error(
          "An error occurred while streaming live content:",
          player.error()
        );

        // Increment current playlist index to try the next source (if applicable)
        playerObj.currentPlaylistIndex++;

        if (playerObj.currentPlaylistIndex < playerObj.playlist.length) {
          // Load the next source in the playlist
          player.src(playerObj.playlist[playerObj.currentPlaylistIndex]);
          player.load();
        } else {
          // All sources in playlist failed
          console.log("All live streams failed.");

          // Clear any previous sources and reset player state
          player.reset();
        }
      });
    });
  });

  function initializePlayers(playerIds, isMuted) {
    playerIds.forEach((id) => {
      const player = videojs(id);
      player.muted(isMuted);
      player.volume(isMuted ? 0 : 1);
      player.on("play", () => {
        pauseAllExcept(id);
      });
    });
  }

  function pauseAllExcept(activePlayerId) {
    players.forEach((playerObj) => {
      if (playerObj.id !== activePlayerId) {
        const player = videojs(playerObj.id);
        if (player) {
          player.pause();
        }
      }
    });
  }

  updatePosterPlayingBasedOnDateTime();
  setInterval(updatePosterPlayingBasedOnDateTime, 60000);

  initializePlayers(["nethdima-tv"], true);
});

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audioPlayer");
  const playPauseButton = document.getElementById("playPauseButton");
  const currentTimeDisplay = document.getElementById("currentTime");
  const currentDateDisplay = document.getElementById("currentDate");
  const playTimeDisplay = document.getElementById("playTime");
  const bufferingIndicator = document.getElementById("bufferingIndicator");
  const broadcastText = document.getElementById("broadcastText");

  // Handle play/pause button click
  playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playPauseButton.textContent = "❚❚";
      playPauseButton.style.color = "green";
      broadcastText.style.display = "block";
    } else {
      audio.pause();
      playPauseButton.textContent = "▶";
      playPauseButton.style.color = "red";
      broadcastText.style.display = "none";
    }
  });

  // Update play time every second
  setInterval(updatePlayTime, 1000);

  function updatePlayTime() {
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);

    // Pad with leading zeros
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    playTimeDisplay.textContent = `${minutes}:${seconds}`;
  }

  // Update current time and date every second
  setInterval(updateTime, 1000);

  function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Pad with leading zeros
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Update current time display
    currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds} ${period}`;

    // Update current date display
    let currentDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    currentDateDisplay.textContent = currentDate;
  }

  // Handle audio buffering events
  audio.addEventListener("waiting", function () {
    bufferingIndicator.style.display = "flex";
    playPauseButton.textContent = "▶";
    playPauseButton.style.color = "red";
    broadcastText.style.display = "none";
  });

  audio.addEventListener("playing", function () {
    bufferingIndicator.style.display = "none";
    playPauseButton.textContent = "❚❚";
    playPauseButton.style.color = "green";
    broadcastText.style.display = "block";
  });

  // Handle audio end event
  audio.addEventListener("ended", function () {
    playPauseButton.textContent = "▶";
    broadcastText.style.display = "none";
  });

  // Handle audio error event
  audio.addEventListener("error", function () {
    bufferingIndicator.style.display = "none";
    playPauseButton.style.display = "none";
    broadcastText.textContent =
      "Failed to stream live content. Please check your internet connection or try again later.";
    broadcastText.style.display = "block";
    broadcastText.style.color = "red";
  });

  // Initial setup
  audio.addEventListener("loadedmetadata", function () {
    bufferingIndicator.style.display = "none";
  });
});
