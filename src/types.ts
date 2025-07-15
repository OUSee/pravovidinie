export enum UserType {
    client = 'client',
    lawyer = 'lawyer',
    autorize = 'autorize'
}

export type Message = {
    text: string;
    seen: boolean | undefined;
    timestamp: string | undefined;
    id: string | undefined;
    from: string;
}

export enum CallStatus {
  canceled = 'canceled'
}

export class Timer {
        private startTime: number | null = null;
        private elapsed: number = 0;
        private timerId: number | null = null;
        private readonly interval: number;
        private onTick = (elapsedMS: number) => {console.log(elapsedMS)};
        
        constructor(onTick: (elapsedMS: number) => void, interval = 1000){
            this.onTick = onTick;
            this.interval = interval;
        }

        start(){
            if(this.timerId !== null){
                this.startTime = performance.now();
                this.timerId = window.setInterval(()=>{
                  if(this.startTime === null) return;
                  const now = performance.now();
                  const totalElapsed = this.elapsed + (now - this.startTime);
                  this.onTick(totalElapsed);
                }, this.interval)
            }
        }

        pause(){
          if (this.timerId === null || this.startTime === null) return;
          const now = performance.now();
          this.elapsed += now - this.startTime;
          this.startTime = null;
          clearInterval(this.timerId);
          this.timerId = null
        }

        stop(){
          this.pause();
          this.elapsed = 0;
          this.onTick(0)
        }

        getElapsed(): number{
          if(this.startTime === null) return this.elapsed;
          return this.elapsed + (performance.now() - this.startTime)
        }
    }