import * as THREE from 'three'

export class Ball extends THREE.Object3D
{
    readonly radius : number;

    public velocity : THREE.Vector3;
    public initialPosition : THREE.Vector3;
    private shadow : THREE.Mesh;

    constructor(position: THREE.Vector3, radius : number)
    {
        super();
        this.radius = radius;
        this.velocity = new THREE.Vector3();
        this.initialPosition = position;

        // Create the sphere
        var geometry = new THREE.SphereGeometry(this.radius);
        var material = new THREE.MeshPhongMaterial();
        material.color = new THREE.Color(0.335, 0.775, 0.891);
        this.add(new THREE.Mesh(geometry, material));

        // Create a semi-transparent shadow
        var shadowGeometry = new THREE.CircleGeometry(this.radius, 20);
        var shadowMaterial = new THREE.MeshBasicMaterial();
        shadowMaterial.color = new THREE.Color(0, 0, 0); 
        shadowMaterial.transparent = true;
        shadowMaterial.opacity = 0.5;
        this.shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        this.shadow.rotation.set(-90 * Math.PI / 180, 0, 0);
        this.add(this.shadow);
          
        this.reset();
    }

    public reset() : void
    {
        // Reset the ball's position
        this.position.copy(this.initialPosition);

        // Throw the ball in a random direction
        var randomAngle = Math.random() * Math.PI * 2;
        this.velocity.set(25*Math.cos(randomAngle), 10, 25* Math.sin(randomAngle))
    }

    public update(deltaTime : number) : void
    {
        // Add your code here
        if (this.position.x <= -40+2.6 || this.position.x >= 40-2.6){ // collide with sides
            this.velocity.x *= -1; // reverse direction
            this.velocity.x -= .8 * deltaTime; // friction slows ball
        }

        if (this.position.y <= 2.6 || this.position.y >= 35-2.6){ // collide ceiling ground
            this.velocity.y *= -1; // reverse direction
            this.velocity.y -= .8 * deltaTime; // friction slows ball
        }   

        if (this.position.z <= -50+2.6 || this.position.z >= 50-2.6){ // collide front back
            this.velocity.z *= -1; // reverse direction
            this.velocity.z -= .8 * deltaTime; // friction slows ball not sure if works

        }       
        this.position.x += this.velocity.x * deltaTime;
        //update velocity based on acceleration
        if (this.position.y > 2.6){
            this.velocity.y -= 9.8 * deltaTime; // gravity only occurs if ball isn't on the ground already
        }
        this.position.y += this.velocity.y * deltaTime; 
        this.position.z += this.velocity.z * deltaTime;


    
    }

    public updateShadow() : void
    {
        // Move the shadow down and slightly above the ground
        this.shadow.position.set(0, -this.position.y + 0.01, 0);
    }
}
