class PomodoroTimer {
    // 1. The constructor runs when we create a new timer object
    constructor(timerDisplay, startBtn, resetBtn, sessionsCompleted, focusTime) {
        // Store DOM elements
        this.timerDisplay = timerDisplay;
        this.startBtn = startBtn;
        this.resetBtn = resetBtn;
        this.sessionsCompleted = sessionsCompleted;
        this.focusTime = focusTime;

        // Timer durations (in seconds)
        this.WORK_DURATION = 25 * 60; // 25 minutes
        this.BREAK_DURATION = 5 * 60; // 5 minutes

        // State variables
        this.intervalId = null;
        this.timeLeft = this.WORK_DURATION;
        this.isRunning = false;
        this.isBreak = false;
        this.totalFocusMinutes = 0;
        this.sessionCount = 0;
    }

    // 2. Main timer logic: handles the countdown
    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            // Timer finished
            this.pauseTimer(); // Stop the timer

            if (!this.isBreak) {
                // Work session finished
                this.sessionCount++;
                this.totalFocusMinutes += (this.WORK_DURATION / 60);
                this.updateStats();
                alert("Work session complete! Time for a 5-minute break!");
                this.startBreak();
            } else {
                // Break session finished
                alert("Break over! Time to focus again!");
                this.resetTimer(); // Resets to a new work session
            }
        }
    }

    // 3. Timer controls (methods)
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startBtn.textContent = "⏸ Pause";
        // We use .bind(this) to make sure 'this' inside tick() refers to the class instance
        this.intervalId = setInterval(this.tick.bind(this), 1000);
    }

    pauseTimer() {
        this.isRunning = false;
        this.startBtn.textContent = "▶ Start";
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    startBreak() {
        this.isBreak = true;
        this.timeLeft = this.BREAK_DURATION;
        this.updateDisplay();
        this.startTimer(); // Automatically start the break timer
    }

    resetTimer() {
        this.pauseTimer(); // Stop any running timer
        this.isBreak = false;
        this.timeLeft = this.WORK_DURATION;
        this.updateDisplay();
    }

    // 4. UI update helpers
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    updateStats() {
        this.sessionsCompleted.textContent = this.sessionCount;
        this.focusTime.textContent = `${Math.floor(this.totalFocusMinutes / 60)}h ${this.totalFocusMinutes % 60}m`;
    }

    // 5. Initializer: sets up event listeners and default state
    init() {
        // Use .bind(this) to ensure 'this' refers to the class in the event handlers
        this.startBtn.addEventListener('click', this.toggleTimer.bind(this));
        this.resetBtn.addEventListener('click', this.resetTimer.bind(this));
        
        // Set the initial display on load
        this.updateDisplay(); 
    }
}
